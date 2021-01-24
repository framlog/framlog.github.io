// Based on a script by Kathie Decora : katydecorah.com/code/lunr-and-jekyll/

// Create the lunr index for the search
var index = elasticlunr(function () {
  this.addField('title')
  this.addField('author')
  this.addField('layout')
  this.addField('content')
  this.setRef('id')
});

// Add to this index the proper metadata from the Jekyll content

index.addDoc({
  title: "Angular2, Nodes",
  author: null,
  layout: "post",
  content: "\n  可以通过扩展RouterOutletDirective来实现权限控制\n  使用FormBuilder和ng-form-model进行自定义表单验证\n  使用AsyncRouter（即在RouterConfig里面设置loader）实现components的异步加载\n  一个Component的生命周期hook:\n    \n      OnChanges (if any bindings have changed),\n      OnInit (after the first check only),\n      DoCheck,\n      AfterContentInit,\n      AfterContentChecked,\n      AfterViewInit,\n      AfterViewChecked,\n      OnDestroy (at the very end before destruction) Implement this interface to get notified when any data-bound property of your directive changes.\n    \n  \n\n\n",
  id: 0
});
index.addDoc({
  title: "Future:Promise in cpp",
  author: null,
  layout: "post",
  content: "今天偶然看到了一个对于Future／Promise模型的简单实现，然后就自己做了一遍。在这里记录一下。\n\n// A simple implement of future/promise module.\n#include &lt;chrono&gt;\n#include &lt;iostream&gt;\n#include &lt;memory&gt;\n#include &lt;thread&gt;\n\ntemplate&lt;class T&gt;\nclass Future;\n\ntemplate&lt;class T&gt;\nauto promise(T task) {\n    using return_t = decltype(task());\n    auto ret = std::make_shared&lt;return_t&gt;();\n    auto t = std::thread([=]{ *ret = task(); });\n    return Future&lt;return_t&gt;(ret, std::move(t));\n}\n\ntemplate&lt;class T&gt;\nclass Future {\npublic:\n    explicit Future(std::shared_ptr&lt;T&gt; ret, std::thread&amp;&amp; t): \n        ret_(ret), t_(std::move(t)) { /* NULL */ }\n    void Wait() { t_.join(); }\n    T GetValue() { return *ret_; }\nprivate:\n    std::shared_ptr&lt;T&gt; ret_;\n    std::thread t_;\n};\n\n// test\nint main() {\n    auto f = promise([]{\n        using namespace std::literals;\n        std::this_thread::sleep_for(1s);\n        return \"Hello, World!\";\n    });\n    f.Wait();\n    std::cout &lt;&lt; f.GetValue() &lt;&lt; std::endl;\n    return 0;\n}\n\n\n可以看到，它里面有较多新的东西。这也是记录的原因之一吧。\n\n",
  id: 1
});
index.addDoc({
  title: "Rotate Array",
  author: null,
  layout: "post",
  content: "What’ll you do if someone asks you to (cyclic) left shift the array?\n\nHere is the stl version:\n\ntemplate&lt;class ForwardIt&gt;\nvoid rotate(ForwardIt first, ForwardIt n_first, ForwardIt last) {\n\tForwardIt next = n_first;\n\twhile (first != next) {\n\t\tstd::iter_swap(first++, next++);\n\t\tif (next == last) next = n_first;\n\t\telse if (first == n_first) n_first = next;\n\t}\n}\n\n\n",
  id: 2
});
index.addDoc({
  title: "GRE",
  author: null,
  layout: "post",
  content: "背掉3000，刷完magoosh你就会发现GRE其实并不太难。\n\nGRE一战155+165+3，水过。\n\n不好意思Quant拖了中国人的平均分的后腿\n\np.s. 很早就听说4分是50 percentile, 3分是国人裸考水平。然而看到成绩才知道3分是17 percentile…\n",
  id: 3
});
index.addDoc({
  title: "魔禁之c++",
  author: null,
  layout: "post",
  content: "user space context switch\n#include &lt;ucontext.h&gt;\n#include &lt;iostream&gt;\n\nint main() {\n    ucontext_t ctx;\n    getcontext(&amp;ctx);\n    std::cout &lt;&lt; \"Hello, World!\" &lt;&lt; std::endl;\n    setcontext(&amp;ctx);\n    return 0;\n}\n\n用户态下直接切换上下文。常用来实现协程。seastar里面用这玩意结合longjmp和setjmp实现了用户态的future线程库。因为ucontext_t这个struct太大的，所以用了diverse function。\n不得不承认确实惊艳。\n\nplacement new\nclass Object;\n\ntypename std::aligned_storage&lt;Object&gt;::type obj;\nnew(&amp;obj)Object(); // placement new\nobj.~Object(); // relative call style of destructor\n\n这个没啥说的。代码看多的基本都应该见过，就是用来栈上分配或节约内存的。\n\nstack unwind\n\nTODO\n\n__attribute__\nvoid dump(Object* o) { std::cout &lt;&lt; obj &lt;&lt; \" is freed.\" &lt;&lt; std::endl; }\n{\n    // `cleanup` attribute registers a function which will be call at the\n    // end of the variable's life cycle. e.g. the following code dumps\n    // a message when obj is out of the scope.\n    Object obj __attribute__((cleanup(dump)));\n\n    // TODO: more attributes\n}\n\n\n",
  id: 4
});
index.addDoc({
  title: "Intern At Didi",
  author: null,
  layout: "post",
  content: "今早去滴滴交了工牌，这一段耗时六个多月的实习终于正式结束了。写篇blog扯扯感想吧：\n\n  期间，参与开发了一个分布式的NoSQL数据库，从各个方面都得到了不小的锻炼吧，比如gdb使用，modern c++使用，RocksDB, pika, etc.,对国内的工作环境也有了更进一步的认识.\n  另外，从一个根本不会用命令行的渣渣成长成了一个对term算是比较熟悉的业余运维，也算是一个没想到的技能收货吧（虽然不知道我还回去的速度有多快╮(￣▽￣)╭）。\n  见识到不少厉害的人，比如有个哥们从Java层调试bug调到glibc；比如讨论上oceanbank的时候我只有听听的份，根本插不上嘴= =；比如讨论raid5如何渣，NVM如何好，等等。\n  老板相当nice。团建相当多，相当赞。\n  遇到了几个兴致相投的哥们，几个测试妹子:)\n  感谢期间的队友吧。感谢在我干出各种线上故障的时候照着我，合理解决问题，而不是抱怨。\n  求fusion一统天下\n\n\n",
  id: 5
});
console.log( jQuery.type(index) );

// Builds reference data (maybe not necessary for us, to check)
var store = [{
  "title": "Angular2, Nodes",
  "author": null,
  "layout": "post",
  "link": "/texts/2015-12-05-Angular2,%20Notes/",
}
,{
  "title": "Future:Promise in cpp",
  "author": null,
  "layout": "post",
  "link": "/texts/2016-04-13-Future:Promise%20in%20cpp/",
}
,{
  "title": "Rotate Array",
  "author": null,
  "layout": "post",
  "link": "/texts/2016-04-19-Rotate%20Array/",
}
,{
  "title": "GRE",
  "author": null,
  "layout": "post",
  "link": "/texts/2017-02-21-GRE/",
}
,{
  "title": "魔禁之c++",
  "author": null,
  "layout": "post",
  "link": "/texts/2017-09-16-%E9%AD%94%E7%A6%81%E4%B9%8Bc++/",
}
,{
  "title": "Intern At Didi",
  "author": null,
  "layout": "post",
  "link": "/texts/2017-11-17-Intern%20At%20Didi/",
}
]

// Query
var qd = {}; // Gets values from the URL
location.search.substr(1).split("&").forEach(function(item) {
    var s = item.split("="),
        k = s[0],
        v = s[1] && decodeURIComponent(s[1]);
    (k in qd) ? qd[k].push(v) : qd[k] = [v]
});

function doSearch() {
  var resultdiv = $('#results');
  var query = $('input#search').val();

  // The search is then launched on the index built with Lunr
  var result = index.search(query);
  resultdiv.empty();
  if (result.length == 0) {
    resultdiv.append('<p class="">No results found.</p>');
  } else if (result.length == 1) {
    resultdiv.append('<p class="">Found '+result.length+' result</p>');
  } else {
    resultdiv.append('<p class="">Found '+result.length+' results</p>');
  }
  // Loop through, match, and add results
  for (var item in result) {
    var ref = result[item].ref;
    var searchitem = '<div class="result"><p><a href="'+store[ref].link+'?q='+query+'">'+store[ref].title+'</a></p></div>';
    resultdiv.append(searchitem);
  }
}

$(document).ready(function() {
  if (qd.q) {
    $('input#search').val(qd.q[0]);
    doSearch();
  }
  $('input#search').on('keyup', doSearch);
});
