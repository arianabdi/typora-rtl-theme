# Typora RTL Theme

# برای رفع اشکال راست و چپ شدن در لینوکس و ویندوز و مک راه کار زیر رو میریم.









فایل frame.js رو باز میکنیم:

پاراگراف
برای تغییر  مقدار تگ های p مقدار `class='md-end-block md-p'` رو جستجو میکنیم و مقدار زیر رو پیدا کنید:

```
return "<p " + p(this) + " class='md-end-block md-p'>" + f(this) + "</p>";
```

و به شکل زیر تغییر بدهید.
````
return "<p " + p(this) + " dir='auto' class='md-end-block md-p'>" + f(this) + "</p>";
````





هدینگ

برای تغییر عناوین مقدار `class='md-end-block md-heading'` رو جستجو میکنیم و مقدار زیر رو پیدا کنید:
```
return "<h" + this.get("depth") + p(this) + "class='md-end-block md-heading' >" + f(this) + "</h" + 
```

و به شکل زیر تغییر بدهید.
````
return "<h" + this.get("depth") + p(this) + "class='md-end-block md-heading' dir='auto'>" + f(this) + "</h" + 
````









لیست ها

برای راست و چپ چین کردن منظم لیست ها باید کد زیر را به آخر فایل `frame.js` اضافه کنیم. قبل از هرچیز باید تابع ای که این کار رو انجام میدهد را پیاده سازی کنیم. این تابع برای ۳ تگ `ul` و `ol` و  `backquote` ها این گار رو انجام میدهد و اولین حرف از هر تگ را بررسی میکند.

در صورتی که واژه فارسی بود آن لیست به کل  `RTL`  و `text-align=right` میشود و در صورتی که انگلیسی بود `LTR` و `text-align=left` میشود

```js
function modifyDOMNode(e){
  var arabic = /[\u0600-\u06FF]/;


  if(e.currentTarget.tagName == "BLOCKQUOTE"){
      if(arabic.test(e.currentTarget.textContent.charAt(0))){
          $(e.currentTarget.firstChild).removeClass("leftq");
      }else{
          $(e.currentTarget.firstChild).addClass("leftq");
      }
  }


  if(arabic.test(e.currentTarget.children[0].textContent.charAt(0))){
      e.currentTarget.children.forEach((item_li, i) => {
          if($(item_li).hasClass( "task-list-item" )){
              $(item_li).find("p").attr("dir", "rtl");
          }
          else {
              $(item_li.firstChild).attr("dir", "rtl");
          }
          $(item_li).attr("dir", "rtl");
      });
      $(e.currentTarget).attr("dir", "rtl");
  }else{
      e.currentTarget.children.forEach((item_li, i) => {
          if($(item_li).hasClass( "task-list-item" )){
              $(item_li).find("p").attr("dir", "ltr");
          }
          else {
              $(item_li.firstChild).attr("dir", "ltr");
          }
          $(item_li).attr("dir", "ltr");
      });
      $(e.currentTarget).attr("dir", "ltr");
  }
}
```







مرحله ی بعد اجرای تابع modifyDOMNode در ۲ زمان.

**‍۱. زمانی که رخداد `DOMNodeInserted` رخ میدهد:**
این اتفاق زمانی می افتد که یک element برای اولین بار درون DOMگذاشته میشود.



**۲. زمانی که رخداد `DOMSubtreeModified` رخ میدهد:**
و این اتفاق هم زمانی رخ میدهد که یک element تغیر میکند.

```js
$("#write").on('DOMNodeInserted', '.ul-list, .ol-list, blockquote', function(e){
    modifyDOMNode(e);
});

$("#write").on('DOMSubtreeModified', '.ul-list, .ol-list, blockquote', function(e){
    modifyDOMNode(e);
});
```





و تمامی  مواردی که توضیح داده شد را با آخر فایل frame.js  اضافه میکنیم و تمام. 

