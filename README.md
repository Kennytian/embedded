### 将React Native集成至Android原生应用
##### Android Studio 2.1 Preview 3生成的空项目
##### react-native 环境 0.22.2

初次编译后apk有1.1M，还算可以接受。 默认依赖的lib如下图所示：


![默认插件集](https://raw.githubusercontent.com/Kennytian/embedded/master/screenshot/1.png)

1.***app/build.gradle***里添加如下代码：

    compile 'com.facebook.react:react-native:0.20.+'

再次编译后apk竟然有10.3M，太夸张了，我们来看看倒底都是什么占用了这么大的空间，仔细看一下其中包含：

android-jsc-r174650：Android里的 jsc 引擎

appcompat-v7-23.0.1：appcompat v7 支持库

bolts-android-1.1.4：Facebook开发的Android的底层库集合，主要是处理 Task

drawee-0.8.1：fresco 控件中的一个负责显示的底层库，包含在 fresco 里
fbcore-0.8.1：Facebook 内核库

fresco-0.8.1：Facebook 开发的一款强大的 Android 图片处理库

imagepipeline-0.8.1：负责完成加载图片（网络、本地文件，本地资源），包含在fresco里

imagepipeline-okhttp-0.8.1:负责完成加载图片前的网络请求，包含在 fresco 里

jackson-core-2.2.3：负责处理 JSON 数据

jsr-305:供检查软件缺陷用的注解

library-2.4.0：nineoldandroids 开源动画库

okhttp-2.5.0：强大的网络请求库

okhttp-ws-2.5.0：okhttp 的 web sockets 功能库

okio-1.5.0：Square 公司开发的补充 java.io 和 java.nio 的不足，用于更加方便，快速的访问、存储和处理你的数据
##### react-native-0.20.1：react native 库，上面和下面这些库都是被带进来的 :) #####
recyclerview-v7-23.0.1：Android 5.0 v7 RecyclerView 扩展库

stetho-1.2.0：Facebook 开发的 Chrome Developer 工具，用来调试React Native程序

stetho-okhttp-1.2.0：stetho 的网络请求支持库

support-annotations-23.0.1：帮助 Android Studio 检测代码中可能存在的错误

support-v4-23.0.1：Android v4 支持库

![添加react native后的插件集](https://raw.githubusercontent.com/Kennytian/embedded/master/screenshot/2.png)

如果原Android项目应用了这些插件，那恭喜你，可以复用了，反之就要算办法精减(我也还在研究)。

2.在MainActivity里添加跳转至ReactNativeActivity的代码（模拟业务场景）

![MainActivity代码](https://raw.githubusercontent.com/Kennytian/embedded/master/screenshot/3.png)

3.添加ReactNativeActivity页面，向里面添加代码（官网那些代码太老了，这个版本是最曼妙的）

![ReactNativeActivity代码](https://raw.githubusercontent.com/Kennytian/embedded/master/screenshot/4.png)

4.向AndroidManifest.xml里添加 ***.ReactNativeActivity*** 和  ***com.facebook.react.devsupport.DevSettingsActivity***
'
<activity android:name=".ReactNativeActivity"
    android:configChanges="keyboard|keyboardHidden|orientation|screenSize" />

<activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
'
5.拷贝如下文件夹及文件到Android项目根目录

node_modules（文件夹。从之前init React Native项目里拷一份过来。因为npm install成功率很低，就算是用taobao的源，也很慢）

.flowconfig （文件。操作方式同上）

.watchmanconfig（文件。操作方式同上）

index.android.js（文件。操作方式同上，注意class名称与下面register时名称要一致）

package.json(文件。操作方式同上，注意文件内容里的name和react-native版本号)


6.修改如下文件

.gitignore（在该文件里添加排除项，node_modules/ 和 npm-debug.log）

app/build.gradle (将'com.android.support:appcompat-v7:23.2.1'改为'com.android.support:appcompat-v7:23.0.1')

gradle.properties (在文件末尾添加，android.useDeprecatedNdk=true)

注意：小坑一个，如果遇到。请按第6项修改，并且要保证react-native版本是0.21.0以上

歪果朋友也深受其害，https://github.com/facebook/react-native/issues/6152#issuecomment-200759453

java.lang.IllegalAccessError: Method 'void android.support.v4.net.ConnectivityManagerCompat.<init>()' is inaccessible to class 'com.facebook.react.modules.netinfo.NetInfoModule' (declaration of 'com.facebook.react.modules.netinfo.NetInfoModule' appears in /data/app/package.name-2/base.apk)

at com.facebook.react.modules.netinfo.NetInfoModule.<init>(NetInfoModule.java:55)

at com.facebook.react.shell.MainReactPackage.createNativeModules(MainReactPackage.java:62)

at com.facebook.react.ReactInstanceManagerImpl.processPackage(ReactInstanceManagerImpl.java:751)

at com.facebook.react.ReactInstanceManagerImpl.createReactContext(ReactInstanceManagerImpl.java:688)

at com.facebook.react.ReactInstanceManagerImpl.access$600(ReactInstanceManagerImpl.java:84)

![android.support版本](https://raw.githubusercontent.com/Kennytian/embedded/master/screenshot/9.png)

