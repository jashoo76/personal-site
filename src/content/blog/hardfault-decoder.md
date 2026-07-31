---
title: "HardFault handler that actually helps"
description: "A practical Cortex-M HardFault decoder: stacked registers, CFSR bits, and a tiny UART backtrace hook."
pubDate: 2025-11-12
tags:
  - cortex-m
  - debugging
  - c
draft: false
---

When a board fails in the field, "HardFault" tells you almost nothing by itself. The useful part is **what the core pushed on the stack** and **which Configurable Fault Status Register bits latched**.

## Read the stacked frame

On exception entry, the hardware pushes `r0`–`r3`, `r12`, `lr`, `pc`, and `xpsr`. If you grab `msp` or `psp` depending on `LR`, you can log the faulting `pc`:

```c
typedef struct {
  uint32_t r0, r1, r2, r3, r12, lr, pc, xpsr;
} exc_stack_t;

void hard_fault_handler_c(uint32_t *stack) {
  exc_stack_t *f = (exc_stack_t *)stack;
  log_uart("HF pc=0x%08lx lr=0x%08lx\n", f->pc, f->lr);
}
```

Assembly entry (GCC) to pass the correct stack pointer:

```asm
.thumb_func
HardFault_Handler:
  tst lr, #4
  ite eq
  mrseq r0, msp
  mrsne r0, psp
  b hard_fault_handler_c
```

## Decode CFSR quickly

`SCB->CFSR` splits into memory, bus, and usage fault fields. Mask and shift instead of guessing:

```c
uint32_t cfsr = SCB->CFSR;
if (cfsr & SCB_CFSR_MEMFAULTSR_Msk) {
  log_uart("MemManage: MMFAR=0x%08lx\n", SCB->MMFAR);
}
```

Keep the handler **short** — no printf, no malloc. Queue a struct and defer formatting to a lower-priority task if you must.

## Takeaway

Treat HardFault as a **structured telemetry event**: capture stack, CFSR/HFSR, and optionally `MMFAR`/`BFAR`. Your future self on a logic analyzer will thank you.
