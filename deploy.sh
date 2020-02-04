npm run build:prod
cd dist
git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:crawlersick/crawlersick.github.io.git master

cd -
