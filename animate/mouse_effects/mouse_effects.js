(function() {
	var width, height, headerH, largeHeader, demo_canvas, ctx, points, target, animateHeader = true;
	largeHeader = document.getElementById('large-header');
	demo_canvas = document.getElementById('demo-canvas');
	if (getComputedStyle(demo_canvas).display != 'none') {
		initHeader();
		initAnimation();
		addListeners();
	}
	
	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;
		headerH = largeHeader.offsetHeight;
		target = {
			x: width / 2,
			y: headerH / 2
		};
		demo_canvas.width = width;
		demo_canvas.height = headerH;
		ctx = demo_canvas.getContext('2d');
		points = [];
		for(var x = 0; x < width; x = x + width / 20) {
			for(var y = 0; y < headerH; y = y + headerH / 20) {
				var px = x + Math.random() * width / 20;
				var py = y + Math.random() * headerH / 20;
				var p = {
					x: px,
					originX: px,
					y: py,
					originY: py
				};
				points.push(p);
			}
		}
		for(var i = 0; i < points.length; i++) {
			var closest = [];
			var p1 = points[i];
			for(var j = 0; j < points.length; j++) {
				var p2 = points[j]
				if(!(p1 == p2)) {
					var placed = false;
					for(var k = 0; k < 5; k++) {
						if(!placed) {
							if(closest[k] == undefined) {
								closest[k] = p2;
								placed = true;
							}
						}
					}
					for(var k = 0; k < 5; k++) {
						if(!placed) {
							if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
								closest[k] = p2;
								placed = true;
							}
						}
					}
				}
			}
			p1.closest = closest;
		}
		for(var i in points) {
			var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
			points[i].circle = c;
		}
	}

	function addListeners() {
		if(!('ontouchstart' in window)) {
			window.addEventListener('mousemove', mouseMove);
		}
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize);
	}

	function mouseMove(e) {
		var posx = posy = 0;
		if(e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY - largeHeader.offsetTop;
		} else if(e.clientX || e.clientY) {
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.documentElement.scrollTop - largeHeader.offsetTop;
		}
		
		target.x = posx;
		target.y = posy;
		animate();
	}

	function scrollCheck() {
		if(document.body.scrollTop > headerH) animateHeader = false;
		else animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		headerH = largeHeader.offsetHeight
		demo_canvas.width = width;
		demo_canvas.height = headerH;
	}

	function initAnimation() {
//		animate();
		for(var i in points) {
			shiftPoint(points[i]);
		}
	}

	function animate() {
		if(animateHeader) {
			ctx.clearRect(0, 0, width, headerH);
			for(var i in points) {
				if(Math.abs(getDistance(target, points[i])) < 4000) {
					points[i].active = 0.3;
					points[i].circle.active = 0.6;
				} else if(Math.abs(getDistance(target, points[i])) < 20000) {
					points[i].active = 0.1;
					points[i].circle.active = 0.3;
				} else if(Math.abs(getDistance(target, points[i])) < 40000) {
					points[i].active = 0.02;
					points[i].circle.active = 0.1;
				} else {
					points[i].active = 0;
					points[i].circle.active = 0;
				}
				drawLines(points[i]);
				points[i].circle.draw();
			}
		}
//		requestAnimationFrame(animate);
	}

	function shiftPoint(p) {
		TweenLite.to(p, 1 + 1 * Math.random(), {
			x: p.originX - 50 + Math.random() * 100,
			y: p.originY - 50 + Math.random() * 100,
			ease: Circ.easeInOut,
			onComplete: function() {
				shiftPoint(p);
			}
		});
	}

	function drawLines(p) {
		if(!p.active) return;
		for(var i in p.closest) {
			ctx.beginPath();
			ctx.moveTo(p.x, p.y);
			ctx.lineTo(p.closest[i].x, p.closest[i].y);
			ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
			ctx.stroke();
		}
	}

	function Circle(pos, rad, color) {
		var _this = this;
		(function() {
			_this.pos = pos || null;
			_this.radius = rad || null;
			_this.color = color || null;
		})();
		this.draw = function() {
			if(!_this.active) return;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
			ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
			ctx.fill();
		};
	}

	function getDistance(p1, p2) {
		return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	}
})();