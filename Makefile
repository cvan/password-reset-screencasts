SLIMERJSLAUNCHER?='/Applications/Firefox24.app/Contents/MacOS/firefox'

.PHONY: all screencasts airbnb amazon facebook github

all: airbnb amazon facebook github

screencasts:
	@pushd scripts && \
		SLIMERJSLAUNCHER=${SLIMERJSLAUNCHER} casperjs ${SITE}.js --engine=slimerjs && \
		popd

ifndef DRY
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
endif

airbnb:
	@SITE='airbnb' NUMBERS='1 2 3 4 5 6 7 8 9 10' make screencasts

amazon:
	@SITE='amazon' NUMBERS='1 2 3 4 5' make screencasts

facebook:
	@SITE='facebook' NUMBERS='1 2' make screencasts

github:
	@SITE='github' NUMBERS='1 2 3 4 5' make screencasts
