# heyirssi

**Michael Sund michael@osund.com www.osund.com**

My irssi notify app

- install dependencies:
    npm install (inside heyirssi directory)
- start typescript compiler with watch option (is slow to respond)
    npm run dev
- build for windows/linux x64 (i couldnt compilse osx without a osx machine)
    npm run packagewin
    npm run packagelin
    npm run packageosx
    (remember to remove the build folder from the project root before running "npm run dev" again)

Todo
- Indicate on toolbar icon in win and osx icon that a new hilight is recieved (ack it?)
- Irssi script should have setters for nick and hosts
- Timer to prevent spam in script or electron?
- Divide angular stuff into components with input/outputs
