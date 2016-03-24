### 向已存在的Android项目里集成React Native
#### 用Android Studio 2.1 Preview 3生成的空项目
`minSdkVersion 16 targetSdkVersion 23`

初次编译后apk有1.1M, 默认依赖的lib如下图所示：

图1

1.***app/build.gradle***里添加如下代码：

    compile 'com.facebook.react:react-native:0.20.+'

再次编译后apk竟然有10.3M，仔细看一下其中包含：fbcore, fresco, okhttp, react-nativet等。

图2


