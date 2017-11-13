var express = require('express');
var router = express.Router();

/*默认跳转至登录页面*/
router.get('/', function(req, res) {
  res.send('<script>location.href="/blog/index.html"</script>')
});

module.exports = router;
