SLIMERJSLAUNCHER?='/Applications/Firefox24.app/Contents/MacOS/firefox'

.PHONY: all screencasts github airbnb

all: github airbnb

screencasts:
	@pushd scripts && \
		SLIMERJSLAUNCHER=${SLIMERJSLAUNCHER} casperjs ${SITE}.js --engine=slimerjs && \
		popd
	@$(foreach i, ${NUMBERS}, \
		ffmpeg -y -r 1/.075 -i tmp/${SITE}_${i}_%03d.png -c:v libx264 -r 30 \
			-pix_fmt yuv420p screencasts/${SITE}_${i}.mp4;)
	@$(foreach i, ${NUMBERS}, \
		ffmpeg -y -r 1/.075 -i tmp/${SITE}_${i}_%03d.png -c:v libvpx -q:v 10 \
			-c:a libvorbis -r 30 -pix_fmt yuv420p screencasts/${SITE}_${i}.webm;)
	@echo
	@$(foreach i, ${NUMBERS}, \
 		echo "Creating ${SITE} screencast #${i}: \033[7;42m SUCCESS \033[0m";)
	@rm -f tmp/${SITE}_*_*.png

github:
	@SITE='github' NUMBERS='1 2 3 4 5' make screencasts

airbnb:
	@SITE='airbnb' NUMBERS='1 2 3 4 5 6' make screencasts
