#!/bin/sh

#####################
# Make the ipa file #
#####################
OUTPUTDIR="$PWD/release/Ios"

xcrun -log -sdk iphoneos PackageApplication -v "$OUTPUTDIR/$APP_NAME.app" -o "$OUTPUTDIR/$APP_NAME.ipa"

#/usr/bin/zip --verbose --recurse-paths "$OUTPUTDIR/$APP_NAME.dsym.zip" "$OUTPUTDIR/$APP_NAME.app.dsym"
