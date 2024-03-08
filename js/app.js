$(document).ready(function () {
	// set CSS variables based on color mode
	function setCSSVariables(mode) {
		if (mode === "light") {
			$("body").css({
				"--base-white": "#ffffff",
				"--base-black": "#000000",
				"--body": "#fdfdfd",
				"--primary-100": "#E9F9F1",
				"--primary-900": "#1DBF73",
				"--warning-300": "#FFCB31",
				"--error-300": "#F56342",
				"--grey-300": "#C3C5C8",
				"--grey-400": "#8692A6",
				"--grey-50": "#F6F6F6",
				"--text-color": "#000000",
				"--shadow-color": "#C8C8C88C",
			});
		} else if (mode === "dark") {
			$("body").css({
				"--base-white": "#202020",
				"--base-black": "#fff",
				"--body": "#1d1d1e",
				"--primary-100": "#252f2a",
				"--primary-900": "#1DBF73",
				"--warning-300": "#FFCB31",
				"--error-300": "#F56342",
				"--grey-300": "#7a7a7f",
				"--grey-400": "#7a7a7b",
				"--grey-50": "#494949",
				"--text-color": "#7a7879",
				"--shadow-color": "#11111155",
			});
		}
	}

	const darkMode = localStorage.getItem("darkMode");
	if (darkMode === "enabled") {
		$("body").addClass("dark-mode");
		$("#dark-mode-toggle").prop("checked", true);
		setCSSVariables("dark");
	} else {
		setCSSVariables("light");
	}

	// Toggle dark mode
	$("#dark-mode-toggle").change(function () {
		if ($(this).is(":checked")) {
			$("body").addClass("dark-mode");
			localStorage.setItem("darkMode", "enabled");
			setCSSVariables("dark");
		} else {
			$("body").removeClass("dark-mode");
			localStorage.setItem("darkMode", null);
			setCSSVariables("light");
		}
	});



	// ==================================== start navbar -> scroll =====================================//
	$(window).scroll(function () {
		var scrollPosition = $(this).scrollTop();
		if (scrollPosition > 200) {
			$('.app-header .navbar').addClass('navbar-scroll');
		} else {
			$('.app-header .navbar').removeClass('navbar-scroll');
		}
	});
	// ==================================== end navbar -> scroll =====================================//


	// ==================================== start navbar -> dropdown =====================================//
	$(".dropdown-toggle").click(function () {
		var dropdownContent = $(".dropdown-content");

		if (dropdownContent.is(":visible")) {
			dropdownContent.fadeOut();
		} else {
			dropdownContent.fadeIn();
		}
	});

	$(document).click(function (event) {
		if (!$(event.target).closest(".dropdown-toggle").length) {
			if ($(".dropdown-content").is(":visible")) {
				$(".dropdown-content").fadeOut();
			}
		}
		if (!$(event.target).closest("#toggle-sidebar").length) {
			if ($(".mobile-navbar").hasClass("open")) {
				$('.mobile-navbar').removeClass('open');
				$('body').removeClass('sidebar-open');
				$('.toggle-btn').removeClass('open');
			}
		}
	});

	$(".dropdown").click(function (event) {
		event.stopPropagation();
	});

	// ==================================== end navbar -> dropdown =====================================//
	// ==================================== start navbar -> sidebar =====================================//
	$('#toggle-sidebar').click(function () {
		$('.mobile-navbar').toggleClass('open');
		$('body').toggleClass('sidebar-open');
		$('.toggle-btn').toggleClass('open');
	});
	// ==================================== end navbar -> sidebar =====================================//

	// ==================================== Toggle -> Like =====================================//
	$('.heart').click(function () {
		$(this).toggleClass('liked');
		if (!$(this).hasClass('liked')) {
			$(this).attr('src', './assets/heartLike.svg');
		} else {
			$(this).attr('src', './assets/redHeartLike.svg');
		}
	});
	// ==================================== Toggle -> Like =====================================//

	// ==================================== Toggle -> Select =====================================//
	function checkAllSelected() {
		var allChecked = true;
		$('.service-add img').each(function () {
			if (!$(this).hasClass('checked')) {
				allChecked = false;
				return false;
			}
		});

		if (allChecked) {
			$('.select-all').addClass('all-selected');
			$('.select-all img').attr('src', './assets/all-checked.svg');
		} else {
			$('.select-all').removeClass('all-selected');
			$('.select-all img').attr('src', './assets/checkAll.svg');

		}
	}

	checkAllSelected();

	$('.service-add img').click(function () {
		$(this).toggleClass('checked');
		checkAllSelected();
		if (!$(this).hasClass('checked')) {
			$(this).attr('src', './assets/emptyCheck.svg');
		} else {
			$(this).attr('src', './assets/check.svg');
		}
	});

	$('.select-all').click(function () {
		$(this).toggleClass('all-selected');
		if (!$(this).hasClass('all-selected')) {
			$('.select-all img').attr('src', './assets/checkAll.svg');
			$('.service-add img').attr('src', './assets/emptyCheck.svg').removeClass('checked');
		} else {
			$('.select-all img').attr('src', './assets/all-checked.svg');
			$('.service-add img').attr('src', './assets/check.svg').addClass('checked');
		}
	});
	// ==================================== Toggle -> Select =====================================//

	// ==================================== Slider =====================================//

	let currentIndex = 0;

	$(".next").click(function () {
		currentIndex = (currentIndex + 1) % $(".slide").length;
		updateSlider();
	});

	$(".prev").click(function () {
		currentIndex =
			(currentIndex - 1 + $(".slide").length) % $(".slide").length;
		updateSlider();
	});

	function updateSlider() {
		if ($('html').attr('dir') == 'ltr') {
			$(".slider").css("transform", `translateX(-${currentIndex * 100}%)`);
		} else {
			$(".slider").css("transform", `translateX(${currentIndex * 100}%)`)
		}
	}

	// ==================================== End Slider =====================================//
	// ==================================== Increase and Decrease =====================================//

	var price = 300;
	var count = 3;
	$('#price').text('$' + price);
	$('#count').text(count);
	$('#increase').click(function () {
		// Increase the price by 10
		price += 100;
		count += 1
		$('#price').text('$' + price);
		$('#count').text(count);
	});
	$('#decrease').click(function () {
		if (count > 1) {
			count = Math.max(0, count - 1);
			price = Math.max(0, price - 100);
			// Update the displayed price
			$('#price').text('$' + price);
			$('#count').text(count);
		}
	});
	$('.purchase-btn').click(function () {
		count = 1;
		price = 100;
		$('#price').text('$' + price);
		$('#count').text(count);
	});
	// ==================================== End Increase and Decrease =====================================//


	// ==================================== Start Rating =====================================//

	let all_rates = [{
			name: "Jane Smith",
			image: "./assets/client.jpeg",
			rate: 3,
			date: "10m",
			comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit.... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,',
		},
		{
			name: "Jane Smith",
			image: "./assets/client.jpeg",
			rate: 2,
			date: "10m",
			comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit.... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,',
		},
		{
			name: "Jane Smith",
			image: "./assets/client.jpeg",
			rate: 4,
			date: "10m",
			comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet, consectetur adipiscing elit.... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam nisi, cras neque Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet,',
		}
	];

	function renderRates(rate) {
		let commentHTML = '<div class="client-rate-details comment my-2">';
		commentHTML += `<div class="client-rate-img"><img src="${rate.image}" alt="" /></div>`;
		commentHTML += '<div class="client-rate-comment">';
		commentHTML += '<h2>' + rate.name + '</h2>';
		commentHTML += '<div class="client-rate-star-and-date" data-rating="' + rate.rate + '">';
		commentHTML += '<div class="client-rate-stars">';
		let star = "";
		for (let i = 1; i <= 5; i++) {
			if (i <= rate.rate) {
				star = '<img src="./assets/star-filled.svg" alt="" />';
			} else {
				star = '<img src="./assets/star.svg" alt="" />';
			}
			commentHTML += star;
		}
		commentHTML += '</div>';
		commentHTML += `<div class="comment-date"><h3>${rate.date}</h3></div>`;
		commentHTML += '</div>';
		commentHTML += '<p>' + rate.comment + '</p>';
		commentHTML += '</div>';
		commentHTML += '</div>';
		$('.client-rate-container .comments').append(commentHTML);
	}



	function updateStars(container) {
		var rate = container.attr('data-rate');
		var ratePercentage = (rate / 5) * 100;
		container.parent().find('.rate-line').css('width', ratePercentage + '%');
		container.parent().find('.rate-number').text(rate);

		container.find('img').each(function (index) {
			if (index < rate) {
				$(this).attr('src', './assets/star-filled.svg');
			} else {
				$(this).attr('src', './assets/star.svg');
			}
		});
	}

	$('.rate-stars-container').each(function () {
		updateStars($(this));
	});

	$('.rate-stars-container img').mouseenter(function () {
		updateStars($(this).parent());
	});



	$('.rate-stars-container img').click(function () {
		var rate = $(this).index() + 1;
		$(this).parent().attr('data-rate', rate);
		updateStars($(this).parent());
	});

	// ==================================== start post-review =====================================//
	function updateOverallRate() {
		var totalRate = 0;
		$('.rate').each(function () {
			totalRate += parseInt($(this).attr('data-rate'));
		});
		var averageRate = totalRate / $('.rate').length;
		var scaledRate = Math.ceil(averageRate / 5 * 5);

		let payload = {
			name: "User Name",
			image: "./assets/icons/avatar.svg",
			rate: scaledRate,
			date: 'now',
			comment: $('#comment-value').val()
		};
		all_rates.push(payload);
		renderRates(payload);
		$('#comment-value').val('');
	}
	$('.post-review').on('click', function () {
		let all_rates_selected = [];

		// Start Validations Rules
		$('.rate-stars-container').each(function (i, el) {
			let rate = parseInt($(el).attr('data-rate'));
			all_rates_selected.push(rate);
		});
		if ($('#comment-value').val()) {
			$('#comment-value').css({
				'border': '1px solid var(--gray-50)'
			})
			$('.comment-error').hide();
		} else {
			if (!$('#comment-value').val()) {
				$('#comment-value').css({
					'border': '1px solid var(--error-300)'
				})
				$('.comment-error').show();
			}
		}
		if (!all_rates_selected.every((el) => el > 0)) {
			$('#about-rate-container').css({
				'border': '1px solid var(--error-300)'
			})
			window.scrollTo({
				top: $('#about-rate-container').offset().top - 200,
				behavior: 'smooth'
			})
			$('.rate-error').show();
		} else {
			$('.rate-error').hide();

			$('#about-rate-container').css({
				'border': 'none'
			})

		}
		// End Validations Rules 

		// All Valid
		if (all_rates_selected.every((el) => el > 0) && $('#comment-value').val()) {
			updateOverallRate();

		}
	});

	all_rates.forEach(function (rate) {
		renderRates(rate);
	});
	// ==================================== end post-review =====================================//
});