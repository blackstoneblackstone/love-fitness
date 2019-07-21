var gulp = require('gulp')
var sftp = require('gulp-sftp')

// 这里可以直接使用 sftp 上传文件到你的服务器
gulp.task('gm', function () {
  return gulp.src('dist/*')
    .pipe(sftp({
      host: '', // ip
      user: 'root',
      remotePath:'/opt/server' // path
    }))
})
