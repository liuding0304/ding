import{_ as s,c as n,o as a,b as l}from"./app.ac902fba.js";const m=JSON.parse('{"title":"nginx配置","description":"","frontmatter":{},"headers":[{"level":2,"title":"vue-router 历史模式nginx配置","slug":"vue-router-历史模式nginx配置","link":"#vue-router-历史模式nginx配置","children":[]},{"level":2,"title":"处理vue项目index.html缓存问题配置","slug":"处理vue项目index-html缓存问题配置","link":"#处理vue项目index-html缓存问题配置","children":[]},{"level":2,"title":"nginx配置项","slug":"nginx配置项","link":"#nginx配置项","children":[]}],"relativePath":"nginx.md"}'),p={name:"nginx.md"},e=l(`<h1 id="nginx配置" tabindex="-1">nginx配置 <a class="header-anchor" href="#nginx配置" aria-hidden="true">#</a></h1><h2 id="vue-router-历史模式nginx配置" tabindex="-1">vue-router 历史模式nginx配置 <a class="header-anchor" href="#vue-router-历史模式nginx配置" aria-hidden="true">#</a></h2><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location / </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    root            /data/www</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">   </span><span style="color:#676E95;"># 前端资源地址</span></span>
<span class="line"><span style="color:#A6ACCD;">    index           index.html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;"># 默认的html文件名</span></span>
<span class="line"><span style="color:#A6ACCD;">    try_files       </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">uri/ /index.html</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">    </span><span style="color:#676E95;"># 例如请求 /test/index  先查找文件/test/index， 然后查找/test/index/\${index.html} 最后转向/index.html</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="处理vue项目index-html缓存问题配置" tabindex="-1">处理vue项目index.html缓存问题配置 <a class="header-anchor" href="#处理vue项目index-html缓存问题配置" aria-hidden="true">#</a></h2><p>html和htm文件不做缓存</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">location ~* ^.*\\.(html|htm) {</span></span>
<span class="line"><span style="color:#A6ACCD;">    # root   /work/zte-vue;</span></span>
<span class="line"><span style="color:#A6ACCD;">    add_header Cache-Control &quot;no-cache, no-store&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    add_header Pragma no-cache;</span></span>
<span class="line"><span style="color:#A6ACCD;">    add_header Expires 0;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="nginx配置项" tabindex="-1">nginx配置项 <a class="header-anchor" href="#nginx配置项" aria-hidden="true">#</a></h2><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">#运行用户</span></span>
<span class="line"><span style="color:#A6ACCD;">user nobody;</span></span>
<span class="line"><span style="color:#A6ACCD;">#启动进程,通常设置成和cpu的数量相等</span></span>
<span class="line"><span style="color:#A6ACCD;">worker_processes  1;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#全局错误日志及PID文件</span></span>
<span class="line"><span style="color:#A6ACCD;">#error_log  logs/error.log;</span></span>
<span class="line"><span style="color:#A6ACCD;">#error_log  logs/error.log  notice;</span></span>
<span class="line"><span style="color:#A6ACCD;">#error_log  logs/error.log  info;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#pid        logs/nginx.pid;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#工作模式及连接数上限</span></span>
<span class="line"><span style="color:#A6ACCD;">events {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #epoll是多路复用IO(I/O Multiplexing)中的一种方式,</span></span>
<span class="line"><span style="color:#A6ACCD;">    #仅用于linux2.6以上内核,可以大大提高nginx的性能</span></span>
<span class="line"><span style="color:#A6ACCD;">    use   epoll;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #单个后台worker process进程的最大并发链接数</span></span>
<span class="line"><span style="color:#A6ACCD;">    worker_connections  1024;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    # 并发总数是 worker_processes 和 worker_connections 的乘积</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 即 max_clients = worker_processes * worker_connections</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 在设置了反向代理的情况下，max_clients = worker_processes * worker_connections / 4  为什么</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 为什么上面反向代理要除以4，应该说是一个经验值</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 根据以上条件，正常情况下的Nginx Server可以应付的最大连接数为：4 * 8000 = 32000</span></span>
<span class="line"><span style="color:#A6ACCD;">    # worker_connections 值的设置跟物理内存大小有关</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 因为并发受IO约束，max_clients的值须小于系统可以打开的最大文件数</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 而系统可以打开的最大文件数和内存大小成正比，一般1GB内存的机器上可以打开的文件数大约是10万左右</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 我们来看看360M内存的VPS可以打开的文件句柄数是多少：</span></span>
<span class="line"><span style="color:#A6ACCD;">    # $ cat /proc/sys/fs/file-max</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 输出 34336</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 32000 &lt; 34336，即并发连接总数小于系统可以打开的文件句柄总数，这样就在操作系统可以承受的范围之内</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 所以，worker_connections 的值需根据 worker_processes 进程数目和系统可以打开的最大文件总数进行适当地进行设置</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 使得并发总数小于操作系统可以打开的最大文件数目</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 其实质也就是根据主机的物理CPU和内存进行配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    # 当然，理论上的并发总数可能会和实际有所偏差，因为主机还有其他的工作进程需要消耗系统资源。</span></span>
<span class="line"><span style="color:#A6ACCD;">    # ulimit -SHn 65535</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">http {</span></span>
<span class="line"><span style="color:#A6ACCD;">    #设定mime类型,类型由mime.type文件定义</span></span>
<span class="line"><span style="color:#A6ACCD;">    include    mime.types;</span></span>
<span class="line"><span style="color:#A6ACCD;">    default_type  application/octet-stream;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #设定日志格式</span></span>
<span class="line"><span style="color:#A6ACCD;">    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    access_log  logs/access.log  main;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，</span></span>
<span class="line"><span style="color:#A6ACCD;">    #对于普通应用，必须设为 on,</span></span>
<span class="line"><span style="color:#A6ACCD;">    #如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，</span></span>
<span class="line"><span style="color:#A6ACCD;">    #以平衡磁盘与网络I/O处理速度，降低系统的uptime.</span></span>
<span class="line"><span style="color:#A6ACCD;">    sendfile     on;</span></span>
<span class="line"><span style="color:#A6ACCD;">    #tcp_nopush     on;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #连接超时时间</span></span>
<span class="line"><span style="color:#A6ACCD;">    #keepalive_timeout  0;</span></span>
<span class="line"><span style="color:#A6ACCD;">    keepalive_timeout  65;</span></span>
<span class="line"><span style="color:#A6ACCD;">    tcp_nodelay     on;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #开启gzip压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip  on;</span></span>
<span class="line"><span style="color:#A6ACCD;">    gzip_disable &quot;MSIE [1-6].&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #设定请求缓冲</span></span>
<span class="line"><span style="color:#A6ACCD;">    client_header_buffer_size    128k;</span></span>
<span class="line"><span style="color:#A6ACCD;">    large_client_header_buffers  4 128k;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    #设定虚拟主机配置</span></span>
<span class="line"><span style="color:#A6ACCD;">    server {</span></span>
<span class="line"><span style="color:#A6ACCD;">        #侦听80端口</span></span>
<span class="line"><span style="color:#A6ACCD;">        listen    80;</span></span>
<span class="line"><span style="color:#A6ACCD;">        #定义使用 www.nginx.cn访问</span></span>
<span class="line"><span style="color:#A6ACCD;">        server_name  www.nginx.cn;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        #定义服务器的默认网站根目录位置</span></span>
<span class="line"><span style="color:#A6ACCD;">        root html;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        #设定本虚拟主机的访问日志</span></span>
<span class="line"><span style="color:#A6ACCD;">        access_log  logs/nginx.access.log  main;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        #默认请求</span></span>
<span class="line"><span style="color:#A6ACCD;">        location / {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">            #定义首页索引文件的名称</span></span>
<span class="line"><span style="color:#A6ACCD;">            index index.php index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        # 定义错误提示页面</span></span>
<span class="line"><span style="color:#A6ACCD;">        error_page   500 502 503 504 /50x.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        location = /50x.html {</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        #静态文件，nginx自己处理</span></span>
<span class="line"><span style="color:#A6ACCD;">        #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写。</span></span>
<span class="line"><span style="color:#A6ACCD;">        location ~ ^/(images|javascript|js|css|flash|media|static)/ {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">            #过期30天，静态文件不怎么更新，过期可以设大一点，</span></span>
<span class="line"><span style="color:#A6ACCD;">            #如果频繁更新，则可以设置得小一点。</span></span>
<span class="line"><span style="color:#A6ACCD;">            expires 30d;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        #PHP 脚本请求全部转发到 FastCGI处理. 使用FastCGI默认配置.</span></span>
<span class="line"><span style="color:#A6ACCD;">        location ~ .php$ {</span></span>
<span class="line"><span style="color:#A6ACCD;">            fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#A6ACCD;">            fastcgi_index index.php;</span></span>
<span class="line"><span style="color:#A6ACCD;">            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#A6ACCD;">            include fastcgi_params;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        #禁止访问 .htxxx 文件</span></span>
<span class="line"><span style="color:#A6ACCD;">            location ~ /.ht {</span></span>
<span class="line"><span style="color:#A6ACCD;">            deny all;</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br></div></div>`,8),r=[e];function c(o,i,t,C,b,A){return a(),n("div",null,r)}const y=s(p,[["render",c]]);export{m as __pageData,y as default};
