//on met tout dans une IIFE pour etre penard
(function () {

	//tableau contenant tous les liens lightbox
	var tabLiens = window.document.querySelectorAll('a.lightBox');
	//longueur du tabLien pour optimisation
	var lTabLiens = tabLiens.length;
	//div overlay où on affiche les images
	var overlay = window.document.getElementById('overlay');
	//variable switch qui détermine si une image est actuellement affichée ou pas
	var displayed = false;
	//objet Image dans lequel on stockera les attributs de l'image à charger
	var stockImg = new Image();

	//namespace qui regroupe les fonctions event
	var evenement = {

		//si on clique sur une image
		clickLien: function (e) {
			//on annule la redirection vers l'image directe
			e.preventDefault();
			//on affiche l'image en mode lightbox
			evenement.displayImg(e.currentTarget);
		},

		//afficher l'image en mode lightbox
		displayImg: function (element) {

			stockImg.addEventListener('load', function () {
				overlay.innerHTML = '';
				overlay.appendChild(stockImg);
				overlay.focus();
				displayed = true;
			});

			stockImg.src = element.href;
			overlay.style.display = 'block';
			overlay.innerHTML = '<span>Chargement en cours...</span>';
		},

		//si on clicque l'image displayed
		overlayClick: function (e) {
			evenement.unDisplayImg();
		},

		//si on appuie sur une touche
		overlayKey: function (e){
			if(displayed && (e.keyCode==27))
				evenement.unDisplayImg();
		},

		//revenir au premier ecran
		unDisplayImg: function () {
			overlay.style.display = 'none';
			displayed = false;
		}
	}

	//ajout de l'evenenent unDisplayImg() lors du clique sur l'image displayed
	overlay.addEventListener('click', evenement.overlayClick);
	//ajout de l'evenement unDisplayImg() lors de l'appui sur echap
	window.document.addEventListener('keydown', evenement.overlayKey);
	//ajout de l'event displayImg() sur chaque lien image
	for(var i=0; i<lTabLiens; i++)
		tabLiens[i].addEventListener('click', evenement.clickLien);

})();
