# password-reset-screencasts

Screencasts of good and bad UX for "Password Reset" flows.

Created using CasperJS (using the SlimerJS engine) and ffmeg.


## Installation

Using [Homebrew](http://brew.sh/), install the following:

    brew install casperjs slimerjs ffmpeg --with-libvpx --with-theora --with-libogg --with-libvorbis

If you've already installed ffmpeg but without the aforementioned codes, reinstall:

    brew install ffmpeg --with-libvpx --with-theora --with-libogg --with-libvorbis


## Usage

To generate all the screencasts:

    make

Set the `SLIMERJSLAUNCHER` environment variable to override the location of the Firefox binary to use with SlimerJS.
