地区代码来源于国家行政部网站，转成josn格式文字，供前端使用

欢迎使用和提供BUG
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta charset="utf-8" />
<title>area code</title>
</head>
<body>
<select id="s0"></select>
<select id="s1"></select>
<select id="s2"></select><br />
<select id="s11"></select>
<select id="s12"></select>
<select id="s13"></select>
<script src="./jquery.js"></script> 
<script src="./data.min.js"></script> 
<script src="./jquery.areaAddress.js"></script>
<script>
$(function(){ 
  $('#s0').areaAddress({
    province: 's0',
    city: 's1',
    area: 's2'
  });
  $('#s11').areaAddress({
    province: 's11',
    city: 's12',
    area: 's13',
    p:'810000',
    c:'',
    a:''
  });
});
</script>
</body>
</html>

