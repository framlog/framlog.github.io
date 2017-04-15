---
layout: post
title: Rotate Array
date: 2016-4-19
categories: algorithm
---
What'll you do if someone asks you to (cyclic) left shift the array?

Here is the stl version:

```c++
template<class ForwardIt>
void rotate(ForwardIt first, ForwardIt n_first, ForwardIt last) {
	ForwardIt next = n_first;
	while (first != next) {
		std::iter_swap(first++, next++);
		if (next == last) next = n_first;
		else if (first == n_first) n_first = next;
	}
}
```



