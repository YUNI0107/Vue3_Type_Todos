#!/usr/bin/env sh
rm -rf dist

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist


git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/YUNI0107/Vue3_Type_Todos.git main:gh-pages

cd -