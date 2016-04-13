今天偶然看到了一个对于`Future／Promise`模型的简单实现，然后就自己做了一遍。在这里记录一下。

```cpp
// A simple implement of future/promise module.
#include <chrono>
#include <iostream>
#include <memory>
#include <thread>

template<class T>
class Future;

template<class T>
auto promise(T task) {
    using return_t = decltype(task());
    auto ret = std::make_shared<return_t>();
    auto t = std::thread([=]{ *ret = task(); });
    return Future<return_t>(ret, std::move(t));
}

template<class T>
class Future {
public:
    explicit Future(std::shared_ptr<T> ret, std::thread&& t): 
        ret_(ret), t_(std::move(t)) { /* NULL */ }
    void Wait() { t_.join(); }
    T GetValue() { return *ret_; }
private:
    std::shared_ptr<T> ret_;
    std::thread t_;
};

// test
int main() {
    auto f = promise([]{
        using namespace std::literals;
        std::this_thread::sleep_for(1s);
        return "Hello, World!";
    });
    f.Wait();
    std::cout << f.GetValue() << std::endl;
    return 0;
}
```

可以看到，它里面有较多新的东西。这也是记录的原因之一吧。


