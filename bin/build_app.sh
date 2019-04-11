cd ~/Code/my_blog_client
git pull origin master
npm install
npm run build
find build/ -name '*map*' -delete
pm2 restart static-page-server-3001
