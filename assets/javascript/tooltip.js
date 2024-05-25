const $tooltip = '[data-tooltip="true"]';

const clearToggle = function (event_, $element, $toggle) {
	const { target } = event_;

	if (
		!$(target).is($element) &&
		!$(target).parents().is($element) &&
		!$(target).is($toggle) &&
		!$(target).parents().is($toggle)
	) {
		$($element).each(function () {
			$(this).toggleClass('is-active', false);
		});
	}
};

const edgeDetect = ($target, x, y) => {
	const $win = $(window);
	const tgt = {};

	if (!x) {
		x = $target.offset().left;
	}

	if (!y) {
		y = $target.offset().top;
	}

	tgt.left = x;
	tgt.top = y;
	tgt.width = $target.innerWidth();
	tgt.height = $target.innerHeight();
	tgt.bottom = (tgt.top + tgt.height);
	tgt.right = (tgt.left + tgt.width);

	tgt.currentTop = tgt.top - $win.scrollTop();
	tgt.currentLeft = tgt.left - $win.scrollLeft();
	tgt.currentRight = (tgt.currentLeft + tgt.width);
	tgt.currentBottom = (tgt.currentTop + tgt.height);

	tgt.isTop = (tgt.top - tgt.bottom) < 0;
	tgt.isLeft = (tgt.left - tgt.right) < 0;
	tgt.isRight = ($win.width - tgt.right) > tgt.width;
	tgt.isBottom = ($win.height - tgt.bottom) > tgt.height;

	return tgt;
};

$($tooltip).each(function () {
	const $this = $(this);
	
	// Replace the title attribute with custom-title
	const titleText = $this.attr('title');
	$this.attr('custom-title', titleText).removeAttr('title');
	
	let $that = {};
	$this.on({
		mouseenter: () => {
			$('body').append('<span class="c-tooltip" data-tooltip-container="true"></span>');
			$that = $('[data-tooltip-container="true"]'); // Fix to ensure correct selection
			$that.append($this.attr('custom-title'));
			const gap = 8; // set equal to default spacing unit size
			const link = edgeDetect($this);
			const tip = edgeDetect($that);

			// set left to center of link
			tip.left = ((link.left + (link.width / 2)) - (tip.width / 2));

			// not enough space in default location below link set above
			if ((link.currentBottom + gap + tip.height) > $(window).height()) {
				tip.top = (link.top - tip.height - gap);
			} else {
				tip.top = (link.bottom + gap);
			}

			$that.attr('style', 'left: ' + tip.left + 'px; top: ' + tip.top + 'px;');
			$that.toggleClass('is-active');
		},
		mouseleave: () => {
			$that.remove();
		},
	});
});
