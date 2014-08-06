# password-reset-screencasts

Screencasts of good and bad UX for "Password Reset" flows for the following sites:

* Airbnb
* Amazon
* Facebook
* GitHub
* Google
* Kickstarter
* Pinterest
* Tumblr
* Twitter

Created using CasperJS (using the SlimerJS engine) and ffmeg (to stitch screencasts together to create `.webm` and `.mp4` videos).


## Installation

Using [Homebrew](http://brew.sh/), install the following:

    brew install casperjs slimerjs ffmpeg --with-libvpx --with-theora --with-libogg --with-libvorbis

If you've already installed ffmpeg but without the aforementioned codecs, reinstall:

    brew install ffmpeg --with-libvpx --with-theora --with-libogg --with-libvorbis


## Usage

First set the `SLIMERJSLAUNCHER` environment variable if you wish to override the location of the Firefox binary to use with SlimerJS.

To generate all the screencasts:

    make

To generate screencasts for only one site:

    make airbnb

To do a dry run (i.e., run the CasperJS scripts only and skip the video processing):

    DRY='1' make airbnb
