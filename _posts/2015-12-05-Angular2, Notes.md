---
layout: post
title: Angular2, Nodes
date: 2015-12-05
categories: Angular, Javascript
---
+ 可以通过扩展`RouterOutlet`Directive来实现权限控制
+ 使用`FormBuilder`和`ng-form-model`进行自定义表单验证
+ 使用`AsyncRouter`（即在`RouterConfig`里面设置`loader`）实现components的异步加载
+ 一个Component的生命周期hook:
	+ `OnChanges` (if any bindings have changed),
	+ `OnInit` (after the first check only),
	+ `DoCheck`,
	+ `AfterContentInit`,
	+ `AfterContentChecked`,
	+ `AfterViewInit`,
	+ `AfterViewChecked`,
	+ `OnDestroy` (at the very end before destruction) Implement this interface to get notified when any data-bound property of your directive changes.


