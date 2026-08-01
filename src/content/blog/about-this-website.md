---
title: "Welcome to my website!"
description: "Thank you for visiting :) In this post I share insights and plans about this place - my personal website."
pubDate: 2026-08-01
tags:
  - freertos
  - rtos
  - c
draft: false
---

Dynamic task creation is fine on bigger parts, but on a 256 KB SRAM target I prefer **statically allocated TCBs and stacks** so heap fragmentation cannot silently eat my telemetry buffers.

```c
#define STATIC_TASK(name, fn, prio, stack_words) \
  static StaticTask_t name##_tcb; \
  static StackType_t name##_stack[stack_words]; \
  static const TaskHandle_t name##_handle = xTaskCreateStatic( \
    fn, #name, stack_words, NULL, prio, name##_stack, &name##_tcb)

STATIC_TASK(blink, blink_task, tskIDLE_PRIORITY + 1, 256);
```

Document stack high-water marks in your README and in CI if you run `uxTaskGetStackHighWaterMark` during soak tests.
