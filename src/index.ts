window.Webflow ||= [];
window.Webflow.push(() => {
  //document.addEventListener('DOMContentLoaded', function () {

  // ----------------------------
  //           SWIPER
  // ----------------------------
  const swiperConfiguration = {
    spaceBetween: 12,
    allowTouchMove: false,
    // Disable touch-based swiping (optional)
    resistanceRatio: 0,
    // Prevents users from dragging/swiping past the last slide
    watchOverflow: true,
    // Disables swiper if the slides are fewer than the container width
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    navigation: {
      nextEl: '.slider-main_button.swiper-btn-next',
      prevEl: '.slider-main_button.swiper-btn-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
        // Adjust according to your design
      },
      1024: {
        slidesPerView: 6,
      },
    },
  };
  let swiper = new Swiper('.swiper', swiperConfiguration);
  const resetSwiper = () => {
    swiper.destroy();
    swiper = new Swiper('.swiper', swiperConfiguration);
  };

  // ----------------------------
  //  DATA MODELS AND CONSTANTS
  // ----------------------------
  // const logoUrl =
  //   'https://cdn.prod.website-files.com/66aadbd497db3d8c63799460/66e9c13dd03e9404b10a0393_fabric-store-logo.png';
  const logoUrl =
    'https://cdn.prod.website-files.com/66aadbd497db3d8c63799460/66eb5ac454e950633d646ea2_testlogo.jpg';
  let productsData = {};
  const calhaColors = {
    Branco: 'B',
    Inox: 'I',
    Bronze: 'BZ',
    Preto: 'P',
    Nogueira: 'N',
    Chumbo: 'CH',
  };
  const productSizes = {
    estores: {
      width: [
        80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260,
        270, 280, 290, 300,
      ],
      height: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
    },
    calhas: {
      '5000-B': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '5000-I': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '5000-BZ': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '5000-P': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '5000-N': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '5000-CH': [120, 140, 160, 180, 200, 220, 240, 260, 300, 350, 400, 450, 500],
      '1500-B': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '1500-I': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '1500-BZ': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '1500-P': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '1500-N': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
      '1500-CH': [120, 140, 160, 180, 200, 220, 240, 260, 300, 350, 400, 450, 500],
      '9500M': [
        150, 200, 250, 300, 350, 400, 450, 500, 600, 650, 700, 750, 800, 850, 900, 1e3, 1200,
      ],
      KS: [160, 200, 240, 300, 400, 500, 600],
      'DSXL-B': [160, 200, 240, 300, 400, 600],
      'DSXL-CZ': [160, 200, 240, 300, 400, 600],
      'DSXL-P': [160, 200, 240, 300, 400, 600],
    },
  };
  const selectedColors = [];
  const windows = [];
  let currentStep = 'inicio';
  const selectorValues = {
    inicio: '',
    tecido: '',
    tipo: '',
    bainha: '',
    medidas: '',
    correcao: '',
    calha: '',
    suporte: '',
    instalacao: '',
    nome: '',
    email: '',
    contacto: '',
  };
  const MANUFACTURING_CONSTANTS = {
    usedWidths: [
      { name: 'Franzido', widthRatio: 2.5 },
      { name: 'Ondas', widthRatio: 2.7 },
      { name: 'Macho Juntos', widthRatio: 3 },
      { name: 'Pregas', widthRatio: 2.5 },
    ],
    manufacturingPrices: [
      {
        name: 'Franzido',
        blackout: 9,
        normal: 8,
      },
      {
        name: 'Ondas',
        blackout: 8.5,
        normal: 7.5,
      },
      {
        name: 'Macho Juntos',
        normal: 13.5,
        blackout: 13.5,
        alinhado: 12.5,
      },
      {
        name: 'Pregas',
        normal: 13.5,
        blackout: 13.5,
        alinhado: 12.5,
      },
    ],
    bainhaPrice: {
      price: 3.5,
      widthMargin: 20,
    },
    uniao: {
      maxLength: 400,
      price: 8.6,
      calha9500M: 15,
    },
    prolongadores: 3.7,
    roletesPrice: 5,
    minWindowWidthEstores: 80,
    maxWindowWidthEstores: 300,
    minWindowHeightEstores: 80,
    maxWindowHeightEstores: 300,
    maxWindowWidth: 650,
    maxWindowHeight: 280,
    maxCalhaWidth: 600,
    measuresCheckPrice: 30,
    instalation: [
      { maxWidth: 300, price: 35 },
      { maxWidth: 400, price: 40 },
      { maxWidth: 500, price: 45 },
      { maxWidth: 600, price: 50 },
      { maxWidth: 650, price: 55 },
    ],
  };
  let isNewWindow = true;

  // ----------------------------
  //           ELEMENTS
  // ----------------------------

  // SIMULATOR ELEMENTS
  // ------------------

  // Containers
  const simContainer = document.getElementById('sim-container');
  const cortinaSteps = document.getElementById('steps-cortina');
  const estoreSteps = document.getElementById('steps-estore');

  // Headings
  const simulatorHeadings = {
    step1: document.getElementById('simulator-heading-1'),
    step1i: document.getElementById('inicio-description'),
    step1c: document.getElementById('inicio-description-c'),
    step1e: document.getElementById('inicio-description-e'),
    step2: document.getElementById('simulator-heading-2'),
    step3: document.getElementById('simulator-heading-3'),
    step4: document.getElementById('simulator-heading-4'),
    step5: document.getElementById('simulator-heading-5'),
  };

  // Selectors
  const selectors = {
    inicio: document.getElementById('inicio-selector'),
    tecido: document.getElementById('tecido-selector'),
    tipo: document.getElementById('tipo-selector'),
    bainha: document.getElementById('bainha-selector'),
    medidas: document.getElementById('medidas-selector'),
    correcao: document.getElementById('correcao-selector'),
    suporte: document.getElementById('suporte-selector'),
    instalacao: document.getElementById('instalacao-selector'),
  };

  // Inputs
  const larguraInput = document.getElementById('largura-input');
  const alturaInput = document.getElementById('altura-input');
  const correcaoInput = document.querySelector('#correcao-switch');
  const bainhaInput = document.querySelector('#bainha');
  const tectoRadioBtn = document.getElementById('tecto-radio-btn');
  const paredeRadioBtn = document.getElementById('parede-radio-btn');
  const instalacaoInput = document.querySelector('#instalacao-switch');

  // Error Messages
  const larguraMinErrorEstore = document.getElementById('largura-min-error-estore');
  const alturaMinErrorEstore = document.getElementById('altura-min-error-estore');
  const larguraMaxErrorEstore = document.getElementById('largura-max-error-estore');
  const alturaMaxErrorEstore = document.getElementById('altura-max-error-estore');
  const larguraMaxErrorCortina = document.getElementById('largura-error');
  const alturaMaxErrorCortina = document.getElementById('altura-error');

  // Buttons
  const nextButton = document.getElementById('seguinte-btn');
  const steps = {
    tecido: document.getElementById('step-tecido'),
    tipo: document.getElementById('step-tipo'),
    medidas: document.getElementById('step-medidas'),
    calha: document.getElementById('step-calha'),
    instalacao: document.getElementById('step-instalacao'),
    medidasEstore: document.getElementById('step-medidas-estore'),
    instalacaoEstore: document.getElementById('step-instalacao-estore'),
  };

  // CHECKOUT ELEMENTS
  // -----------------

  // Inputs
  const userDetailsForm = document.getElementById('form');
  const nomeInput = document.getElementById('nome-input');
  const emailInput = document.getElementById('email-input');
  const contactoSwitch = document.getElementById('contacto-switch');

  // Containers
  const checkoutContain = document.getElementById('checkout-container');
  const newWindowContain = document.getElementById('new-window-contain');
  const checkoutFormContain = document.getElementById('checkout-input-contain');
  const checkoutInfoEstore = document.getElementById('checkout-info-estore');
  const checkoutInfoCortina = document.getElementById('checkout-info-cortina');

  // Buttons
  const newWindowButton = document.getElementById('new-window-btn');
  const noWindowButton = document.getElementById('no-window-btn');
  const enviarButton = document.getElementById('enviar-btn');
  const checkoutChoices = {
    tecido: document.getElementById('checkout-tecido'),
    tipo: document.getElementById('checkout-tipo'),
    bainha: document.getElementById('checkout-bainha'),
    largura: document.getElementById('checkout-largura'),
    altura: document.getElementById('checkout-altura'),
    correcao: document.getElementById('checkout-correcao'),
    calha: document.getElementById('checkout-calha'),
    suporte: document.getElementById('checkout-suporte'),
    instalacao: document.getElementById('checkout-instalacao'),
    estoreProduto: document.getElementById('checkout-produto-estore'),
    estoreLargura: document.getElementById('checkout-largura-estore'),
    estoreAltura: document.getElementById('checkout-altura-estore'),
    estoreCorrecao: document.getElementById('checkout-correcao-estore'),
    estoreInstalacao: document.getElementById('checkout-instalacao-estore'),
  };

  // Send Email Form
  const feedbackMessage = document.getElementById('feedback-div');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const checkFieldError = document.getElementById('contacto-switch-error');

  // ----------------------------
  //    FS CMS FILTER ELEMENTS
  // ----------------------------
  const cortinaRadioBtn = document.getElementById('cortina-radio-btn');
  const estoreRadioBtn = document.getElementById('estore-radio-btn');
  const calhaRadioBtn = document.getElementById('calha-radio-btn');

  // ----------------------------
  //          FUNCTIONS
  // ----------------------------

  // INITIALIZIATION
  // ---------------

  const initializeEventListeners = () => {
    addOnClickNextButton();
    addOnClickToInicioCards();
    addOnClickToTecidoCards();
    addOnClickToTipoCards();
    addOnClickBainha();
    addOnClickCorrecao();
    addOnClickInstalacao();
    addOnClickColor();
    addOnClickEnviar();
    addOnClickNewWindow();
    addOnClickNoWindow();
    addOnClickCheckoutChoices();
    addOnClickStep();
    addOnChangeMedidasInputs();
    addOnChangeSuporteRadioBtns();
  };

  const onInit = () => {
    fetchProducts();
    initializeEventListeners();
  };

  // DATA FUNCTIONS
  // ------------

  const getProductPrice = (window2) => {
    let productPrice = 0,
      calhaPrice = 0,
      reference = '';
    const productDetails = window2.tecido.split('-');
    const product = productDetails[0];
    const color = productDetails[1];
    const calhaDetails = window2.calha ? window2.calha.split('-') : null;
    const calha = calhaDetails ? calhaDetails[0] : null;
    const calhaColor = calhaDetails ? calhaDetails[1] : null;
    const width = window2.medidas ? window2.medidas.split(' X ')[0] : 0;

    if (window2.inicio === 'Cortina') {
      reference = `${product}${color}`;
    }

    if (window2.inicio === 'Estore') {
      const height = window2.medidas ? window2.medidas.split(' X ')[1] : 0;
      reference = getVariableEstoreReference(product, color, width, height);
    }

    productPrice =
      typeof productsData[reference].price === 'string'
        ? parseFloat(productsData[reference].price)
        : productsData[reference].price;

    if (window2.inicio === 'Estore') {
      return { product: productPrice, calha: 0 };
    }

    const calhaMultiplier = ((width / MANUFACTURING_CONSTANTS.maxCalhaWidth) | 0) + 1;

    const calhaWidth =
      width <= MANUFACTURING_CONSTANTS.maxCalhaWidth ? width : width / calhaMultiplier;

    const calhaReference = getVariableCalhaReference(
      calha,
      window2.tipo,
      calhaColor,
      calhaWidth,
      window2?.suporte === 'Parede' ? true : false
    );

    calhaPrice = !productsData[calhaReference]
      ? 0
      : width < MANUFACTURING_CONSTANTS.maxCalhaWidth
        ? productsData[calhaReference].price
        : productsData[calhaReference].price * calhaMultiplier;

    calhaPrice +=
      width > MANUFACTURING_CONSTANTS.maxCalhaWidth
        ? MANUFACTURING_CONSTANTS.prolongadores * calhaMultiplier
        : width > MANUFACTURING_CONSTANTS.uniao.maxLength && window2.calha.startsWith('9500M')
          ? MANUFACTURING_CONSTANTS.uniao.calha9500M * calhaMultiplier
          : width > MANUFACTURING_CONSTANTS.uniao.maxLength
            ? MANUFACTURING_CONSTANTS.uniao.price * calhaMultiplier
            : 0;

    (calhaReference.startsWith('5000') || calhaReference.startsWith('1500')) &&
      (calhaPrice +=
        width < MANUFACTURING_CONSTANTS.maxCalhaWidth
          ? MANUFACTURING_CONSTANTS.roletesPrice
          : MANUFACTURING_CONSTANTS.roletesPrice * calhaMultiplier);

    return { product: productPrice, calha: calhaPrice };
  };

  const fetchProducts = () => {
    fetch(
      `https://docs.google.com/spreadsheets/d/1hkgiYOVj33yY6b--bJaNPZOvHFvQ4klM402z0xp-gjE/export?format=csv&gid=0&single=true`
    )
      .then((response) => response.text())
      .then((csvData) => {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map((line) => line.split(','));
        const jsonData = {};
        data.forEach((row) => {
          const [id, price] = row;
          if (!jsonData[id]) {
            jsonData[id] = { id, price: parseFloat(price) };
          }
        });
        productsData = jsonData;
      })
      .catch((error) => console.error('Error fetching CSV data:', error));
  };

  const updateSelectorValue = (selector, value) => {
    selectorValues[selector.id.split('-')[0]] = value;
  };

  const updateCalhaValue = (value) => {
    selectorValues.calha = value;
  };

  const updateSuporteValue = (value) => {
    selectorValues.suporte = paredeRadioBtn.checked ? 'Parede' : 'Tecto';
  };

  const resetValues = () => {
    selectorValues.inicio = '';
    selectorValues.tecido = '';
    selectorValues.tipo = '';
    selectorValues.bainha = '';
    selectorValues.medidas = '';
    selectorValues.correcao = '';
    selectorValues.calha = '';
    selectorValues.suporte = '';
    selectorValues.instalacao = '';
  };

  const populateSelectorValues = (window) => {
    if (window.inicio === 'Cortina') {
      updateSelectorValue(selectors.inicio, 'Cortina');
      updateSelectorValue(selectors.tecido, window.tecido);
      updateSelectorValue(selectors.tipo, window.tipo);
      updateSelectorValue(selectors.bainha, window.bainha);
      updateSelectorValue(selectors.medidas, window.medidas);
      updateSelectorValue(selectors.correcao, window.correcao);
      updateSelectorValue(selectors.calha, window.calha);
      updateSelectorValue(selectors.suporte, window.suporte);
      updateSelectorValue(selectors.instalacao, window.instalacao);
    }

    if (window.inicio === 'Estore') {
      updateSelectorValue(selectors.inicio, 'Estore');
      updateSelectorValue(selectors.tecido, window.tecido);
      updateSelectorValue(selectors.medidas, window.medidas);
      updateSelectorValue(selectors.correcao, window.correcao);
      updateSelectorValue(selectors.instalacao, window.instalacao);
    }
  };

  const storeValues = () => {
    const newWindow = {
      inicio: selectorValues.inicio,
      bainha: selectorValues.bainha,
      tecido: selectorValues.tecido,
      tipo: selectorValues.tipo,
      medidas: selectorValues.medidas,
      correcao: selectorValues.correcao,
      calha: selectorValues.calha,
      suporte: selectorValues.suporte,
      instalacao: selectorValues.instalacao,
    };
    windows.push(newWindow);
    isNewWindow = false;
  };

  const createWindow = () => {
    updateProductsCMSFilter('Cortina');
    resetValues();
    resetInputs();
    navigateFromCheckoutToStep('inicio');
    isNewWindow = true;
  };

  const validateSelector = () => {
    switch (currentStep) {
      case 'inicio':
        if (selectorValues.inicio === '') {
          alert('Por favor selecione um valor');
          return false;
        }
        return true;
      case 'tecido':
        if (selectorValues.tecido === '') {
          alert('Por favor selecione um valor');
          return false;
        }
        return true;
      case 'tipo':
        if (selectorValues.tipo === '') {
          alert('Por favor selecione um valor');
          return false;
        }
        return true;
      case 'medidas':
        if (larguraInput?.value === '' || alturaInput?.value === '') {
          alert('Preencha valores v\xE1lidos de largura e altura');
          activateNextBtn(false);
          return false;
        }
        if (selectorValues.inicio === 'Cortina') {
          // If Maximum value is exceeded
          if (
            parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidth ||
            parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeight
          ) {
            parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidth
              ? (larguraMaxErrorCortina.style.display = 'block')
              : (larguraMaxErrorCortina.style.display = 'none');
            parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeight
              ? (alturaMaxErrorCortina.style.display = 'block')
              : (alturaMaxErrorCortina.style.display = 'none');
            activateNextBtn(false);
            return false; // Error Maximum value exceeded
          }
        }
        if (selectorValues.inicio === 'Estore') {
          // If Minimum value is exceeded
          if (
            parseInt(larguraInput?.value) < MANUFACTURING_CONSTANTS.minWindowWidthEstores ||
            parseInt(alturaInput?.value) < MANUFACTURING_CONSTANTS.minWindowHeightEstores
          ) {
            parseInt(larguraInput?.value) < MANUFACTURING_CONSTANTS.minWindowWidthEstores
              ? (larguraMinErrorEstore.style.display = 'block')
              : (larguraMinErrorEstore.style.display = 'none');
            parseInt(alturaInput?.value) < MANUFACTURING_CONSTANTS.minWindowHeightEstores
              ? (alturaMinErrorEstore.style.display = 'block')
              : (alturaMinErrorEstore.style.display = 'none');
            activateNextBtn(false);
            return false; // Error Minimum value exceeded
          }
          if (
            parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidthEstores ||
            parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeightEstores
          ) {
            parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidthEstores
              ? (larguraMaxErrorEstore.style.display = 'block')
              : (larguraMaxErrorEstore.style.display = 'none');
            parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeightEstores
              ? (alturaMaxErrorEstore.style.display = 'block')
              : (alturaMaxErrorEstore.style.display = 'none');
            activateNextBtn(false);
            return false; // Error Maximum value exceeded
          }
        }
        larguraMaxErrorCortina.style.display = 'none';
        alturaMaxErrorCortina.style.display = 'none';
        larguraMinErrorEstore.style.display = 'none';
        alturaMinErrorEstore.style.display = 'none';
        larguraMaxErrorEstore.style.display = 'none';
        alturaMaxErrorEstore.style.display = 'none';
        return true;
      case 'calha':
        if (selectorValues.calha === '') {
          alert('Por favor selecione um valor');
          return false;
        }
        return true;
      case 'suporte':
        if (selectorValues.suporte === '') {
          alert('Por favor selecione um valor');
          return false;
        }
        return true;
    }
    return true;
  };

  // UTILS
  // -----

  const getVariableEstoreReference = (product, color, width, height) => {
    const closestWidth = productSizes.estores.width.find((w) => w >= width);
    const closestHeight = productSizes.estores.height.find((h) => h >= height);
    return `${product}${closestHeight}${closestWidth}`;
  };

  const getVariableCalhaReference = (product, type, color, width, isWallMounted) => {
    if (product === 'KS') {
      if (isWallMounted) {
        const closestWidth3 = productSizes.calhas[product]?.find((w) => w >= width);
        return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth3}SP`;
      }
      const closestWidth2 = productSizes.calhas[product]?.find((w) => w >= width);
      return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth2}`;
    }
    if (product === 'DSXL') {
      if (isWallMounted) {
        const closestWidth3 = productSizes.calhas[`${product}-${color}`]?.find((w) => w >= width);
        return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth3}${color}SP`;
      }
      const closestWidth2 = productSizes.calhas[`${product}-${color}`]?.find((w) => w >= width);
      return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth2}${color}`;
    }
    if (product === '9500M') {
      if (isWallMounted) {
        const closestWidth3 = productSizes.calhas[product].find((w) => w >= width);
        return `${product}${closestWidth3}SP`;
      }
      const closestWidth2 = productSizes.calhas[product].find((w) => w >= width);
      return `${product}${closestWidth2}`;
    }
    if (isWallMounted) {
      const closestWidth2 = productSizes.calhas[`${product}-${color}`].find((w) => w >= width);
      return `${product}${closestWidth2}${color}SP`;
    }
    const closestWidth = productSizes.calhas[`${product}-${color}`].find((w) => w >= width);
    return `${product}${closestWidth}${color}`;
  };

  const getColorFromCard = (card) => {
    const colorText = card.getElementsByClassName('color_name');
    return colorText.length > 0 ? colorText[0].textContent : null;
  };

  const getProductFromCard = (card) => {
    const productText = card.getElementsByClassName('product_name');
    return productText.length > 0 ? productText[0].textContent : null;
  };

  const convertStepInStepNumber = (step) => {
    switch (step) {
      case 'tecido':
      case 'inicio':
        return 'step1';
      case 'tipo':
      case 'bainha':
        return 'step2';
      case 'medidas':
      case 'correcao':
        return 'step3';
      case 'calha':
        return 'step4';
      case 'instalacao':
        return 'step5';
    }
  };

  // FS CMS FILTER FUNCTIONS
  // -----------------------

  const updateProductsCMSFilter = (productType) => {
    if (productType === 'Estore') {
      estoreRadioBtn?.click();
    }
    if (productType === 'Cortina') {
      cortinaRadioBtn?.click();
    }
    if (productType === 'Calha') {
      calhaRadioBtn?.click();
    }
  };

  // INPUTS HANDLERS
  // ---------------

  const resetInputs = () => {
    const inicioCards = document.querySelectorAll("[id^='inicio-card']");
    const tipoCards = document.querySelectorAll("[id^='tipo-card']");
    const productCards = document.querySelectorAll("[id^='tecido-card']");
    const productColors = document.querySelectorAll('.tecido_color');
    inicioCards.forEach((card) => {
      deactivateCard(card);
    });
    tipoCards.forEach((card) => {
      deactivateCard(card);
    });
    productCards.forEach((card) => {
      deactivateCard(card);
    });
    productColors.forEach((color) => {
      deactivateColor(color);
    });
    larguraInput.value = '';
    alturaInput.value = '';
    correcaoInput.checked = false;
    instalacaoInput.checked = false;
    paredeRadioBtn?.click();
    bainhaInput.checked = false;
  };

  const selectInicio = (value) => {
    const inicioCards = document.querySelectorAll("[id^='inicio-card']");
    inicioCards.forEach((card) => {
      if (card.getElementsByTagName('h1')[0].textContent === value) {
        activateCard(card);
      } else {
        deactivateCard(card);
      }
    });
  };

  const selectProduct = (value) => {
    const productCards = document.querySelectorAll("[id^='tecido-card']");
    productCards.forEach((card) => {
      if (getProductFromCard(card).startsWith(value)) {
        activateCard(card);
      } else {
        deactivateCard(card);
      }
    });
  };

  const clearSuporteRadioBtns = () => {
    tectoRadioBtn.checked = false;
    paredeRadioBtn.checked = false;
  };

  const createWindowBtnCheckout = () => {
    const windowBtn = document.querySelector('#checkout-window-btn');
    const windowbtnsContainer = document.getElementById('window-btns-container');
    if (windows.length === 1) {
      windows[0].button = windowBtn;
      addOnClickToWindowBtn(windows[0]);
    }
    if (windows.length > 1) {
      if (windowBtn) {
        const clonedBtn = windowBtn.cloneNode(true);
        clonedBtn.querySelector('h6').textContent = `Janela ${windows.length}`;
        windows[windows.length - 1].button = clonedBtn;
        addOnClickToWindowBtn(windows[windows.length - 1]);
        windowbtnsContainer?.appendChild(clonedBtn);
      }
    }
  };

  // SIMULATOR FUNCTIONS
  // -------------------

  const populateInputValues = (window) => {
    if (window.inicio === 'Cortina') {
      selectInicio(window.inicio);
      selectProduct(window.tecido);
      selectTipo(window.tipo);
      bainhaInput.checked = window.bainha;
      larguraInput.value = window.medidas.split(' X ')[0];
      alturaInput.value = window.medidas.split(' X ')[1];
      correcaoInput.checked = window.correcao;
      selectSuporte(window.suporte);
      instalacaoInput.checked = window.instalacao;
    }
    if (window.inicio === 'Estore') {
      selectInicio(window.inicio);
      selectProduct(window.tecido);
      larguraInput.value = window.medidas.split(' X ')[0];
      alturaInput.value = window.medidas.split(' X ')[1];
      correcaoInput.checked = window.correcao;
      instalacaoInput.checked = window.instalacao;
    }
  };

  const updateHeadingSubtitles = (step) => {
    if (step === 'inicio') {
      simulatorHeadings.step1i.style.display = 'flex';
      simulatorHeadings.step1c.style.display = 'none';
      simulatorHeadings.step1e.style.display = 'none';
    }
    if (step === 'tecido' && selectorValues.inicio === 'Cortina') {
      simulatorHeadings.step1i.style.display = 'none';
      simulatorHeadings.step1c.style.display = 'flex';
      simulatorHeadings.step1e.style.display = 'none';
    }
    if (step === 'tecido' && selectorValues.inicio === 'Estore') {
      simulatorHeadings.step1i.style.display = 'none';
      simulatorHeadings.step1c.style.display = 'flex';
      simulatorHeadings.step1e.style.display = 'none';
    }
  };

  const navigateToStep = (step) => {
    if (step === 'largura' || step === 'altura') {
      step = 'medidas';
    }
    if (step === currentStep) {
      return;
    }
    if (steps[step].classList.contains('done')) {
      markStepAsNext(currentStep);
      changeSelectorVisibility(simulatorHeadings[convertStepInStepNumber(currentStep)], false);
      if (currentStep === 'calha') {
        changeSelectorVisibility(selectors.tecido, false);
      } else {
        changeSelectorVisibility(selectors[currentStep], false);
      }
      updateHeadingSubtitles(step);
      switch (step) {
        case 'tecido':
          changeSelectorVisibility(simulatorHeadings.step1, true);
          changeSelectorVisibility(selectors.tecido, true);
          break;
        case 'tipo':
          changeSelectorVisibility(simulatorHeadings.step2, true);
          changeSelectorVisibility(selectors.tipo, true);
          break;
        case 'medidas':
          changeSelectorVisibility(simulatorHeadings.step3, true);
          changeSelectorVisibility(selectors.medidas, true);
          break;
        case 'calha':
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.tecido, true);
          break;
        case 'instalacao':
          changeSelectorVisibility(simulatorHeadings.step5, true);
          changeSelectorVisibility(selectors.instalacao, true);
          break;
      }
      currentStep = step;
      markStepAsActive(step);
    }
  };

  const advanceStep = () => {
    if (selectorValues.inicio === 'Cortina') {
      switch (currentStep) {
        case 'inicio':
          if (validateSelector()) {
            toggleSteps('Cortina');
            changeSelectorVisibility(selectors.inicio, false);
            updateHeadingSubtitles('tecido');
            if (isNewWindow) activateNextBtn(false);
            changeSelectorVisibility(selectors.tecido, true);
            currentStep = 'tecido';
          }
          break;
        case 'tecido':
          if (validateSelector()) {
            updateHeadingSubtitles('tecido');
            markStepAsCompleted('tecido');
            markStepAsActive('tipo');
            changeSelectorVisibility(simulatorHeadings.step1, false);
            if (isNewWindow) activateNextBtn(false);
            changeSelectorVisibility(selectors.tecido, false);
            changeSelectorVisibility(simulatorHeadings.step2, true);
            changeSelectorVisibility(selectors.tipo, true);
            currentStep = 'tipo';
          }
          break;
        case 'tipo':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.tipo, false);
            if (
              selectorValues.tecido.startsWith('120') ||
              selectorValues.tecido.startsWith('122')
            ) {
              updateSelectorValue(selectors.bainha, true);
              if (isNewWindow) activateNextBtn(false);
              markStepAsCompleted('tipo');
              markStepAsActive('medidas');
              changeSelectorVisibility(simulatorHeadings.step2, false);
              changeSelectorVisibility(simulatorHeadings.step3, true);
              changeSelectorVisibility(selectors.medidas, true);
              currentStep = 'medidas';
            } else {
              changeSelectorVisibility(selectors.bainha, true);
              currentStep = 'bainha';
            }
          }
          break;
        case 'bainha':
          updateSelectorValue(
            selectors.bainha,
            `${selectorValues.tecido.startsWith('120') || selectorValues.tecido.startsWith('122') ? true : selectorValues.bainha ? selectorValues.bainha : false}`
          );
          markStepAsCompleted('tipo');
          markStepAsActive('medidas');
          changeSelectorVisibility(simulatorHeadings.step2, false);
          changeSelectorVisibility(selectors.bainha, false);
          if (isNewWindow) activateNextBtn(false);
          changeSelectorVisibility(simulatorHeadings.step3, true);
          changeSelectorVisibility(selectors.medidas, true);
          currentStep = 'medidas';
          break;
        case 'medidas':
          if (validateSelector()) {
            updateSelectorValue(
              selectors.medidas,
              `${larguraInput?.value} X ${alturaInput?.value}`
            );
            changeSelectorVisibility(selectors.medidas, false);
            if (windows.length > 0) {
              if (isNewWindow) activateNextBtn(false);
              updateProductsCMSFilter('Calha');
              markStepAsCompleted('medidas');
              markStepAsActive('calha');
              changeSelectorVisibility(simulatorHeadings.step3, false);
              changeSelectorVisibility(simulatorHeadings.step4, true);
              changeSelectorVisibility(selectors.tecido, true);
              currentStep = 'calha';
            } else {
              changeSelectorVisibility(selectors.correcao, true);
              currentStep = 'correcao';
            }
          }
          break;
        case 'correcao':
          updateProductsCMSFilter('Calha');
          markStepAsCompleted('medidas');
          markStepAsActive('calha');
          changeSelectorVisibility(simulatorHeadings.step3, false);
          changeSelectorVisibility(selectors.correcao, false);
          if (isNewWindow) activateNextBtn(false);
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.tecido, true);
          currentStep = 'calha';
          break;
        case 'calha':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.tecido, false);
            if (isNewWindow) activateNextBtn(false);
            clearSuporteRadioBtns();
            changeSelectorVisibility(selectors.suporte, true);
            currentStep = 'suporte';
          }
          break;
        case 'suporte':
          updateSelectorValue(selectors.suporte, paredeRadioBtn?.checked ? 'Parede' : 'Tecto');
          if (validateSelector()) {
            markStepAsCompleted('calha');
            markStepAsActive('instalacao');
            changeSelectorVisibility(simulatorHeadings.step4, false);
            changeSelectorVisibility(selectors.suporte, false);
            if (windows.length > 0) {
              if (isNewWindow) {
                storeValues();
                createWindowBtnCheckout();
              }
              navigateToCheckout();
            } else {
              changeSelectorVisibility(simulatorHeadings.step5, true);
              changeSelectorVisibility(selectors.instalacao, true);
              currentStep = 'instalacao';
            }
          }
          break;
        case 'instalacao':
          markStepAsCompleted('instalacao');
          changeSelectorVisibility(simulatorHeadings.step5, false);
          changeSelectorVisibility(selectors.instalacao, false);
          if (isNewWindow) {
            storeValues();
            createWindowBtnCheckout();
          }
          navigateToCheckout();
          break;
      }
    } else {
      switch (currentStep) {
        case 'inicio':
          if (validateSelector()) {
            toggleSteps('Estore');
            changeSelectorVisibility(selectors.inicio, false);
            if (isNewWindow) activateNextBtn(false);
            changeSelectorVisibility(selectors.tecido, true);
            currentStep = 'tecido';
          }
          break;
        case 'tecido':
          if (validateSelector()) {
            markStepAsCompleted('tecido');
            markStepAsActive('medidas');
            changeSelectorVisibility(simulatorHeadings.step1, false);
            changeSelectorVisibility(selectors.tecido, false);
            if (isNewWindow) activateNextBtn(false);
            changeSelectorVisibility(simulatorHeadings.step3, true);
            changeSelectorVisibility(selectors.medidas, true);
            currentStep = 'medidas';
          }
          break;
        case 'medidas':
          if (validateSelector()) {
            updateSelectorValue(
              selectors.medidas,
              `${larguraInput?.value} X ${alturaInput?.value}`
            );
            changeSelectorVisibility(selectors.medidas, false);
            if (windows.length > 0) {
              markStepAsCompleted('medidas');
              markStepAsActive('instalacao');
              changeSelectorVisibility(simulatorHeadings.step3, false);
              changeSelectorVisibility(simulatorHeadings.step5, true);
              changeSelectorVisibility(selectors.instalacao, true);
              currentStep = 'instalacao';
            } else {
              changeSelectorVisibility(selectors.correcao, true);
              currentStep = 'correcao';
            }
          }
          break;
        case 'correcao':
          markStepAsCompleted('medidas');
          markStepAsActive('instalacao');
          changeSelectorVisibility(simulatorHeadings.step3, false);
          changeSelectorVisibility(selectors.correcao, false);
          if (windows.length > 0) {
            createWindowBtnCheckout();
            navigateToCheckout();
          } else {
            changeSelectorVisibility(simulatorHeadings.step5, true);
            changeSelectorVisibility(selectors.instalacao, true);
            currentStep = 'instalacao';
          }
          break;
        case 'instalacao':
          markStepAsCompleted('instalacao');
          changeSelectorVisibility(simulatorHeadings.step5, false);
          changeSelectorVisibility(selectors.instalacao, false);
          if (isNewWindow) {
            storeValues();
            createWindowBtnCheckout();
          }
          navigateToCheckout();
          break;
      }
    }
  };

  const navigateToCheckout = () => {
    simContainer.style.display = 'none';
    selectWindow(windows[windows.length - 1]);
    toggleSteps();
    checkoutContain.style.display = 'flex';
  };

  // CHECKOUT FUNCTIONS
  // ------------------

  const populateCheckoutChoices = (window2) => {
    if (window2.inicio === 'Cortina') {
      checkoutInfoEstore.style.display = 'none';
      checkoutInfoCortina.style.display = 'flex';
      checkoutChoices.tecido.textContent = window2.tecido;
      checkoutChoices.tipo.textContent = window2.tipo;
      checkoutChoices.bainha.textContent =
        window2.tipo === 'Ondas' || window2.tipo === 'Franzido'
          ? 'Ba\xEDnha de Chumbo inclu\xEDda'
          : window2.bainha
            ? 'Com Ba\xEDnha de Chumbo'
            : 'Sem Ba\xEDnha de Chumbo';
      checkoutChoices.largura.textContent = window2.medidas.split(' X ')[0] + 'cm Largura';
      checkoutChoices.altura.textContent = window2.medidas.split(' X ')[1] + 'cm Altura';
      checkoutChoices.correcao.textContent = windows[0].correcao
        ? 'Com Verifica\xE7\xE3o'
        : 'Sem Verifica\xE7\xE3o';
      checkoutChoices.calha.textContent = window2.calha;
      checkoutChoices.suporte.textContent = 'Suporte de ' + window2.suporte;
      checkoutChoices.instalacao.textContent = windows[0].instalacao
        ? 'Com Instala\xE7\xE3o'
        : 'Sem Instala\xE7\xE3o';
    }

    if (window2.inicio === 'Estore') {
      checkoutInfoEstore.style.display = 'flex';
      checkoutInfoCortina.style.display = 'none';
      checkoutChoices.estoreProduto.textContent = window2.tecido;
      checkoutChoices.estoreLargura.textContent = window2.medidas.split(' X ')[0] + 'cm';
      checkoutChoices.estoreAltura.textContent = window2.medidas.split(' X ')[1] + 'cm';
      checkoutChoices.estoreCorrecao.textContent = windows[0].correcao
        ? 'Com Verifica\xE7\xE3o'
        : 'Sem Verifica\xE7\xE3o';
      checkoutChoices.estoreInstalacao.textContent = windows[0].instalacao
        ? 'Com Instala\xE7\xE3o'
        : 'Sem Instala\xE7\xE3o';
    }
  };

  const selectWindow = (window2) => {
    windows.forEach((w) => {
      if (w.button) {
        w.button.classList.remove('active');
      }
    });
    window2.button.classList.add('active');
    populateCheckoutChoices(window2);
  };

  const navigateFromCheckoutToStep = (step) => {
    checkoutContain.style.display = 'none';
    resetSteps();
    toggleSteps();
    simContainer.style.display = 'flex';

    let isEstore = false;

    if (
      step === 'estoreLargura' ||
      step === 'estoreAltura' ||
      step === 'estoreCorrecao' ||
      step === 'estoreInstalacao' ||
      step === 'estoreProduto'
    ) {
      isEstore = true;
    }

    if (
      step === 'largura' ||
      step === 'altura' ||
      step === 'estoreLargura' ||
      step === 'estoreAltura'
    ) {
      step = 'medidas';
    }

    if (step === 'estoreCorrecao') {
      step = 'correcao';
    }

    if (step === 'estoreInstalacao') {
      step = 'instalacao';
    }

    if (step === 'estoreProduto') {
      step = 'tecido';
    }

    isEstore ? toggleSteps('Estore') : toggleSteps('Cortina');

    switch (step) {
      case 'inicio':
        changeSelectorVisibility(simulatorHeadings.step1, true);
        changeSelectorVisibility(selectors.inicio, true);
        break;
      case 'tecido':
        isEstore ? updateProductsCMSFilter('Estore') : updateProductsCMSFilter('Cortina');
        changeSelectorVisibility(simulatorHeadings.step1, true);
        changeSelectorVisibility(selectors.tecido, true);
        break;
      case 'tipo':
        changeSelectorVisibility(simulatorHeadings.step2, true);
        changeSelectorVisibility(selectors.tipo, true);
        break;
      case 'medidas':
        changeSelectorVisibility(simulatorHeadings.step3, true);
        changeSelectorVisibility(selectors.medidas, true);
        break;
      case 'calha':
        updateProductsCMSFilter('Calha');
        changeSelectorVisibility(simulatorHeadings.step4, true);
        changeSelectorVisibility(selectors.tecido, true);
        break;
      case 'instalacao':
        changeSelectorVisibility(simulatorHeadings.step5, true);
        changeSelectorVisibility(selectors.instalacao, true);
        break;
    }

    currentStep = step;

    if (currentStep === 'inicio') {
      return markStepAsActive('tecido');
    }

    isNewWindow = false;
    // markStepAsActive(step);
  };

  const compressPdf = async (base64Pdf) => {
    const pdfBytes = Buffer.from(base64Pdf, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Here you can manipulate the document
    // Compress images, remove metadata, etc.

    const compressedPdfBytes = await pdfDoc.save();
    return Buffer.from(compressedPdfBytes).toString('base64');
  };

  const fetchImage = async (url) => {
    const response = await fetch(url);
    const imageBytes = await response.arrayBuffer();
    return imageBytes;
  };

  // const generateAndDownloadPdf = async () => {
  //   // Create a new PDF document
  //   const pdfDoc = await PDFDocument.create();
  //   const page = pdfDoc.addPage([210, 297]); // A4 size in mm (210x297)
  //   const { width, height } = page.getSize();
  //   const x = 10;
  //   const rightMargin = width - 20;
  //   let y = height - 25; // Start from the top of the page
  //   const lineHeight = 6;
  //   let total = 0;

  //   // Load the logo image
  //   const logoUrl = 'YOUR_LOGO_URL'; // Replace with actual logo URL
  //   let logoImage = null;
  //   try {
  //     const logoBytes = await fetchImage(logoUrl);
  //     logoImage = await pdfDoc.embedPng(logoBytes);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   // Add the logo image to the PDF
  //   if (logoImage) {
  //     const logoWidth = 40;
  //     const logoHeight = 7;
  //     const logoX = (width - logoWidth) / 2;
  //     page.drawImage(logoImage, {
  //       x: logoX,
  //       y: height - y - logoHeight,
  //       width: logoWidth,
  //       height: logoHeight,
  //     });
  //   }

  //   // Add header text
  //   const font = await pdfDoc.embedFont(PDFDocument.Font.Helvetica);
  //   page.drawText('Data:', { x: rightMargin - 40, y: y, size: 10, font });
  //   page.drawText(new Date().toLocaleDateString(), {
  //     x: rightMargin - 40 + font.widthOfTextAtSize('Data:', 10),
  //     y: y,
  //     size: 10,
  //     font,
  //   });

  //   page.drawText('Cliente:', { x: x, y: y, size: 10, font });
  //   page.drawText(selectorValues.nome, {
  //     x: x + font.widthOfTextAtSize('Cliente:', 10),
  //     y: y,
  //     size: 10,
  //     font,
  //   });
  //   y -= lineHeight;

  //   page.drawText('Email:', { x: x, y: y, size: 10, font });
  //   page.drawText(selectorValues.email, {
  //     x: x + font.widthOfTextAtSize('Email:', 10),
  //     y: y,
  //     size: 10,
  //     font,
  //   });
  //   y -= 25;

  //   // Add window products
  //   for (let index = 0; index < windows.length; index++) {
  //     if (index % 5 === 0 && index !== 0) {
  //       pdfDoc.addPage();
  //       y = height - 25;
  //     }

  //     const window2 = windows[index];
  //     const {
  //       usedWidth,
  //       productPrice,
  //       manufacturingPrice,
  //       bainhaPrice,
  //       calhaPrice,
  //       instalationPrice,
  //       windowTotal,
  //     } = calculateWindowPrice(window2);
  //     total += windowTotal;

  //     page.drawText(
  //       `Janela ${index + 1} - ${window2.medidas} CM - (Largura Utilizada: ${parseInt(parseFloat(usedWidth).toFixed(2))} CM)`,
  //       {
  //         x: x,
  //         y: y,
  //         size: 10,
  //         font,
  //       }
  //     );
  //     page.drawText(`${windowTotal.toFixed(2)}\u20AC`, {
  //       x: x + 150,
  //       y: y,
  //       size: 10,
  //       font,
  //     });
  //     y -= lineHeight;

  //     const subItems = [
  //       { label: `Tecido: ${window2.tecido}`, price: productPrice },
  //       { label: `Tipo de Cortina: ${window2.tipo}`, price: manufacturingPrice },
  //       {
  //         label: `Ba\xEDnha de Chumbo: ${window2.tecido.startsWith('120') || window2.tecido.startsWith('122') ? 'Inclu\xEDda' : window2.bainha ? 'Sim' : 'N\xE3o'}`,
  //         price: bainhaPrice,
  //       },
  //       {
  //         label: `Calha: ${window2.calha} - Suporte: Suporte de ${window2.suporte}`,
  //         price: calhaPrice,
  //       },
  //       {
  //         label: `Instala\xE7\xE3o: ${windows[0].instalacao ? 'Sim' : 'N\xE3o'}`,
  //         price: instalationPrice,
  //       },
  //     ];

  //     subItems.forEach((item) => {
  //       page.drawText(`  - ${item.label}`, {
  //         x: x + 5,
  //         y: y,
  //         size: 8,
  //         font,
  //       });
  //       page.drawText(`${item.price.toFixed(2)}\u20AC`, {
  //         x: x + 150,
  //         y: y,
  //         size: 8,
  //         font,
  //       });
  //       y -= lineHeight;
  //     });

  //     y -= lineHeight;
  //   }

  //   // Add Correção and Total
  //   page.drawText(
  //     `Corre\xE7\xE3o: ${!windows[0].correcao ? 'Medidas facultadas pelo cliente' : 'Com correção de medidas'}`,
  //     {
  //       x: x,
  //       y: y,
  //       size: 10,
  //       font,
  //     }
  //   );
  //   page.drawText(`${windows[0].correcao ? 30 : 0}\u20AC`, {
  //     x: x + 150,
  //     y: y,
  //     size: 10,
  //     font,
  //   });
  //   y -= lineHeight * 2;
  //   total += windows[0].correcao ? 30 : 0;

  //   // Add Total box
  //   page.drawRectangle({
  //     x: x,
  //     y: y,
  //     width: 190,
  //     height: lineHeight + 2,
  //     color: rgb(0.94, 0.94, 0.94),
  //     borderColor: rgb(0, 0, 0),
  //     borderWidth: 1,
  //   });
  //   page.drawText(`Total:`, {
  //     x: x + 120,
  //     y: y + lineHeight - 2,
  //     size: 10,
  //     font,
  //   });
  //   page.drawText(`${total.toFixed(2)}\u20AC`, {
  //     x: x + 150,
  //     y: y + lineHeight - 2,
  //     size: 10,
  //     font,
  //   });

  //   // Add footer text
  //   y -= lineHeight * 4;
  //   page.drawText('Valores com IVA incluido a taxa em vigor. Orçamento valido por 15 dias', {
  //     x: x,
  //     y: y,
  //     size: 8,
  //     font,
  //   });
  //   y -= lineHeight;
  //   page.drawText(
  //     'Calhas já incluem os rodizios e suportes necessárias para as medidas seleccionadas.',
  //     {
  //       x: x,
  //       y: y,
  //       size: 8,
  //       font,
  //     }
  //   );
  //   y -= lineHeight;
  //   page.drawText(
  //     'Valor referente à instalação e Rectificação de Medidas & Instalação sujeito a validação do código postal.',
  //     {
  //       x: x,
  //       y: y,
  //       size: 8,
  //       font,
  //     }
  //   );
  //   y -= lineHeight;
  //   page.drawText('IBAN: PT50 0000 0000 0000 0000 0', {
  //     x: x,
  //     y: y,
  //     size: 8,
  //     font,
  //   });

  //   // Serialize PDFDocument to bytes
  //   const pdfBytes = await pdfDoc.save();
  //   return pdfBytes;
  //   // const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   // const url = URL.createObjectURL(blob);

  //   // // Download the PDF
  //   // const a = document.createElement('a');
  //   // a.href = url;
  //   // a.download = 'Orcamento_Fabric-Store.pdf';
  //   // a.click();
  //   // URL.revokeObjectURL(url);
  // };

  const generateAndDownloadPdf = async () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const x = 10;
    const rightMargin = 190;
    let y = 25;
    const lineHeight = 6;
    let total = 0;
    doc.setFontSize(10);

    // Header Center
    const logoWidth = 40; // Width of the logo
    const logoHeight = 7; // Height of the logo
    const logoX = (doc.internal.pageSize.width - logoWidth) / 2; // Center logo horizontally
    let logoTest = null;
    try {
      logoTest = await loadImageFromWebflow(logoUrl);
    } catch (error) {
      console.error(error);
    }

    // doc.addImage(logoTest, 'PNG', logoX, y - 10, logoWidth, logoHeight); // Fix fetching img instead of loading the logo base64 string staticaly

    // Header Right
    doc.setFont('helvetica', 'bold');
    doc.text('Data:', rightMargin - 40, y);
    doc.setFont('helvetica', 'normal');
    doc.text(new Date().toLocaleDateString(), rightMargin - 40 + doc.getTextWidth('Data: '), y);

    // Header Left
    doc.setFont('helvetica', 'bold');
    doc.text('Cliente:', x, y);
    doc.setFont('helvetica', 'normal');
    doc.text(selectorValues.nome, x + doc.getTextWidth('Cliente:  '), y);
    y += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Email:', x, y);
    doc.setFont('helvetica', 'normal');
    doc.text(selectorValues.email, x + doc.getTextWidth('Email:  '), y);
    y += 25;

    // Windows products
    windows.forEach((window2, index) => {
      if (index % 5 === 0 && index !== 0) {
        doc.addPage();
        y = 25;
      }
      doc.setFontSize(10);
      const {
        usedWidth,
        productPrice,
        manufacturingPrice,
        bainhaPrice,
        calhaPrice,
        instalationPrice,
        windowTotal,
      } = calculateWindowPrice(window2);
      total += windowTotal;
      doc.setFont('helvetica', 'bold');
      const windowDescription = `Janela ${index + 1} - ${window2.medidas} CM - (Largura Utilizada: ${parseInt(parseFloat(usedWidth).toFixed(2))} CM)`;
      doc.text(windowDescription, x, y);
      doc.text(`${windowTotal.toFixed(2)}\u20AC`, x + 150, y);
      y += lineHeight;
      const subItems = [
        { label: `Tecido: ${window2.tecido}`, price: productPrice },
        {
          label: `Tipo de Cortina: ${window2.tipo}`,
          price: manufacturingPrice,
        },
        {
          label: `Ba\xEDnha de Chumbo: ${window2.tecido.startsWith('120') || window2.tecido.startsWith('122') ? 'Inclu\xEDda' : window2.bainha ? 'Sim' : 'N\xE3o'}`,
          price: bainhaPrice,
        },
        {
          label: `Calha: ${window2.calha} - Suporte: Suporte de ${window2.suporte}`,
          price: calhaPrice,
        },
        {
          label: `Instala\xE7\xE3o: ${windows[0].instalacao ? 'Sim' : 'N\xE3o'}`,
          price: instalationPrice,
        },
      ];
      subItems.forEach((item) => {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`  - ${item.label}`, x + 5, y);
        doc.text(`${item.price.toFixed(2)}\u20AC`, x + 150, y);
        y += lineHeight;
      });
      y += lineHeight;
    });

    // if (!windows.length === 6) {
    //   y += lineHeight;
    // }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(
      `Corre\xE7\xE3o: ${!windows[0].correcao ? 'Medidas facultadas pelo cliente' : 'Com correção de medidas'}`,
      x,
      y
    );
    doc.text(`${windows[0].correcao ? 30 : 0}\u20AC`, x + 150, y);
    y += lineHeight;
    y += lineHeight;
    total += windows[0].correcao ? 30 : 0;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(240, 240, 240);
    doc.rect(x, y, 190, lineHeight + 2, 'F');
    doc.text(`Total:`, x + 120, y + lineHeight - 2);
    doc.text(`${total.toFixed(2)}\u20AC`, x + 150, y + lineHeight - 2);

    // After adding the Total box
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    // Adjust the footer position dynamically
    y += lineHeight * 4; // Add more space if needed based on the ending content position
    doc.text('Valores com IVA incluido a taxa em vigor. Orçamento valido por 15 dias', x, y);
    y += lineHeight;
    doc.text(
      'Calhas já incluem os rodizios e suportes necessárias para as medidas seleccionadas.',
      x,
      y
    );
    y += lineHeight;
    doc.text(
      'Valor referente à instalação e Rectificação de Medidas & Instalação sujeito a validação do código postal.',
      x,
      y
    );

    // Ensure there is space between the previous line and the IBAN
    y += lineHeight;
    doc.text(`IBAN: PT50 0000 0000 0000 0000 0`, x, y); // Add IBAN after increasing y
    doc.save('Orcamento_Fabric-Store.pdf');
    return doc.output('blob', { filename: 'Orcamento_Fabric-Store.pdf' });
  };

  // UI FUNCTIONS
  // ------------

  const loadImageFromWebflow = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // Avoid CORS issues
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png'); // Convert image to Base64
        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(new Error(`Failed to load image from ${url}: ${error.message}`));
      };
    });
  };

  const animateOpacity = (element) => {
    element.classList.add('show');
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power1.in' });
  };

  const toggleSteps = (productType) => {
    if (!productType) {
      cortinaSteps.style.display = 'none';
      estoreSteps.style.display = 'none';
    }
    if (productType === 'Cortina') {
      cortinaSteps.style.display = 'flex';
      estoreSteps.style.display = 'none';
    }
    if (productType === 'Estore') {
      cortinaSteps.style.display = 'none';
      estoreSteps.style.display = 'flex';
    }
  };

  const changeSelectorVisibility = (selector, visible) => {
    selector.style.display = visible ? 'flex' : 'none';
  };

  const resetSteps = () => {
    Object.keys(steps).forEach((key) => {
      steps[key].classList.remove('active');
      steps[key].classList.add('next');
      steps[key].classList.remove('done');
      steps[key].getElementsByClassName('step_number')[0].classList.remove('active');
      steps[key].getElementsByClassName('step_description')[0].textContent = 'Escolha';
    });
  };

  const markStepAsCompleted = (step) => {
    steps[step].classList.remove('active');
    steps[step].classList.remove('next');
    steps[step].classList.add('done');
    steps[step].getElementsByClassName('step_number')[0].classList.remove('active');
    if (steps[step].getElementsByClassName('step_description')[0].classList.contains('next')) {
      steps[step].getElementsByClassName('step_description')[0].classList.remove('next');
    }
    steps[step].getElementsByClassName('step_description')[0].textContent = selectorValues[step];
    if (step === 'instalação') {
      steps.instalacaoEstore?.classList.remove('active');
      steps.instalacaoEstore?.classList.remove('next');
      steps.instalacaoEstore?.classList.add('done');
      steps.instalacaoEstore?.getElementsByClassName('step_number')[0].classList.remove('active');
      steps.instalacaoEstore.getElementsByClassName('step_description')[0].textContent =
        selectorValues.instalacao ? 'c/Instala\xE7\xE3o' : 's/Instala\xE7\xE3o';
    }
    if (step === 'medidas') {
      if (windows.length > 0) {
        steps[step].getElementsByClassName('step_description')[0].innerHTML += windows[0].correcao
          ? '<br>c/Verifica\xE7\xE3o'
          : '<br>s/Verifica\xE7\xE3o';
      } else {
        steps[step].getElementsByClassName('step_description')[0].innerHTML +=
          selectorValues.correcao ? '<br>c/Verifica\xE7\xE3o' : '<br>s/Verifica\xE7\xE3o';
      }
      steps.medidasEstore?.classList.remove('active');
      steps.medidasEstore?.classList.remove('next');
      steps.medidasEstore?.classList.add('done');
      steps.medidasEstore?.getElementsByClassName('step_number')[0].classList.remove('active');
      steps.medidasEstore.getElementsByClassName('step_description')[0].textContent =
        `${larguraInput?.value} X ${alturaInput?.value}cm`;
      steps.medidasEstore.getElementsByClassName('step_description')[0].innerHTML +=
        `${selectorValues.correcao ? '<br>c/Verifica\xE7\xE3o' : '<br>s/Verifica\xE7\xE3o'}`;
    }
    if (step === 'tipo') {
      steps[step].getElementsByClassName('step_description')[0].innerHTML += `${
        selectorValues.bainha ? '<br>c/Ba\xEDnha de Chumbo' : '<br>s/Ba\xEDnha de Chumbo'
      }`;
    }
  };

  const markStepAsActive = (step) => {
    steps[step].classList.remove('next');
    steps[step].classList.add('active');
    steps[step].getElementsByClassName('step_number')[0].classList.add('active');

    if (step === 'instalacao') {
      steps.instalacaoEstore?.classList.remove('next');
      steps.instalacaoEstore?.classList.add('active');
      steps.instalacaoEstore?.getElementsByClassName('step_number')[0].classList.add('active');
    }
    if (step === 'medidas') {
      steps.medidasEstore?.classList.remove('next');
      steps.medidasEstore?.classList.add('active');
      steps.medidasEstore?.getElementsByClassName('step_number')[0].classList.add('active');
    }
  };

  const markStepAsNext = (step) => {
    if (steps[step].classList.contains('active')) {
      steps[step].classList.remove('active');
      steps[step].getElementsByClassName('step_number')[0].classList.remove('active');
    }
    if (step === 'instalacao') {
      steps.instalacaoEstore?.classList.remove('active');
      steps.instalacaoEstore?.getElementsByClassName('step_number')[0].classList.remove('active');
    }
    if (step === 'medidas') {
      steps.medidasEstore?.classList.remove('active');
      steps.medidasEstore?.getElementsByClassName('step_number')[0].classList.remove('active');
    }

    if (!isNewWindow) return markStepAsCompleted(step);

    steps[step].classList.add('next');
    if (!steps[step].getElementsByTagName('p')[0].classList.contains('next')) {
      steps[step].getElementsByTagName('p')[0].classList.add('next');
    }
    if (step === 'instalacao') {
      steps.instalacaoEstore?.classList.add('next');
    }
    if (step === 'medidas') {
      steps.medidasEstore?.classList.add('next');
    }
  };

  const activateNextBtn = (isActive) => {
    if (isActive) {
      if (nextButton?.classList.contains('inactive')) {
        nextButton.classList.remove('inactive');
      }
    }
    if (!isActive) {
      if (!nextButton?.classList.contains('inactive')) {
        nextButton.classList.add('inactive');
      }
    }
  };

  const activateColor = (color) => {
    color.classList.add('active');
  };

  const deactivateColor = (color) => {
    color.classList.remove('active');
  };

  const activateCard = (card) => {
    const title = card.getElementsByTagName('h1')[0];
    const imageContain = card.getElementsByClassName('tecido_image_contain')[0];
    card.classList.add('selected');
    title.classList.add('active');
    imageContain.classList.add('active');
  };

  const deactivateCard = (card) => {
    const title = card.getElementsByTagName('h1')[0];
    const imageContain = card.getElementsByClassName('tecido_image_contain')[0];
    card.classList.remove('selected');
    title.classList.remove('active');
    imageContain.classList.remove('active');
  };

  // EVENT LISTENERS
  // ---------------
  const addOnClickToInicioCards = () => {
    const cards = document.querySelectorAll("[id^='inicio-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const productType = card.getElementsByTagName('h1')[0].textContent;
        activateCard(card, selectors.inicio);
        cards.forEach((cardFromList) => {
          if (cardFromList !== card) {
            deactivateCard(cardFromList);
          }
        });
        updateProductsCMSFilter(productType);
        updateSelectorValue(selectors.inicio, productType);
        if (validateSelector()) activateNextBtn(true);
      });
    });
  };

  const addOnClickToTecidoCards = () => {
    const cards = document.querySelectorAll("[id^='tecido-card']");
    const colors = document.querySelectorAll('.tecido_color');
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const cardProduct = getProductFromCard(card);
        const cardColor = getColorFromCard(card);
        const existingSelection = selectedColors.find((color) => color.product === cardProduct);
        const cardColors = card.getElementsByClassName('tecido_color');
        colors.forEach((color) => deactivateColor(color));
        activateCard(card, selectors.tecido);
        cards.forEach((cardFromList) => {
          if (cardFromList !== card) {
            deactivateCard(cardFromList);
          }
        });
        if (existingSelection) {
          for (let i = 0; i < cardColors.length; i++) {
            if (cardColors.item(i).id === `${existingSelection.color}`) {
              activateColor(cardColors.item(i));
            }
          }
          if (currentStep === 'tecido') {
            updateSelectorValue(selectors.tecido, existingSelection.color);
          }
          if (currentStep === 'calha') {
            updateCalhaValue(existingSelection.color);
          }
        } else {
          cardColors.length > 0 && activateColor(cardColors[0]);
          if (currentStep === 'tecido' && cardColor !== '') {
            updateSelectorValue(selectors.tecido, `${cardColor}`);
          }
          if (currentStep === 'calha' && cardColor !== '') {
            updateCalhaValue(cardColor);
          }
        }
        if (validateSelector()) activateNextBtn(true);
      });
    });
  };

  const addOnClickColor = () => {
    const colors = document.querySelectorAll('.tecido_color');
    colors.forEach((color) => {
      color.addEventListener('click', (event) => {
        const selectedDiv = event.currentTarget;
        const selectedColor = selectedDiv && selectedDiv.id;
        activateColor(selectedDiv);
        colors.forEach((colorFromList) => {
          if (colorFromList !== selectedDiv) {
            deactivateColor(colorFromList);
          }
        });
        const product = selectedColor ? selectedColor.split('-')[0] : '';
        const latestSelection = selectedColors.find((color2) => color2.product === product);
        if (latestSelection) {
          latestSelection.color = `${selectedColor}`;
        } else {
          selectedColors.push({ product, color: `${selectedColor}` });
        }
        const cardThumbnailImage =
          selectedDiv.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
            'tecido_image'
          )[0];
        for (let i = 0; i < colors.length; i++) {
          if (colors[i].getAttribute('id') === selectedColor) {
            cardThumbnailImage.setAttribute(
              'src',
              colors[i].getElementsByTagName('img')[0].getAttribute('src')
            );
            cardThumbnailImage.setAttribute('srcset', '');
            break;
          }
        }
        if (currentStep === 'calha' && selectedColor !== '') {
          return updateCalhaValue(selectedColor);
        }
        if (currentStep === 'tecido' && selectedColor !== '') {
          return updateSelectorValue(selectors.tecido, selectedColor);
        }
        return console.log('No color was stored');
      });
    });
  };

  const addOnClickToTipoCards = () => {
    const cards = document.querySelectorAll("[id^='tipo-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        activateCard(card, selectors.tipo);
        cards.forEach((cardFromList) => {
          if (cardFromList !== card) {
            deactivateCard(cardFromList);
          }
        });
        updateSelectorValue(selectors.tipo, card.getElementsByTagName('h1')[0].textContent);
        if (validateSelector()) activateNextBtn(true);
      });
    });
  };

  const addOnClickBainha = () => {
    bainhaInput.addEventListener('change', function (event) {
      updateSelectorValue(selectors.bainha, bainhaInput.checked);
    });
  };

  const addOnChangeSuporteRadioBtns = () => {
    paredeRadioBtn?.addEventListener('change', (event) => {
      if (paredeRadioBtn?.checked === true || tectoRadioBtn?.checked === true) {
        updateSuporteValue('Parede');
        if (validateSelector()) activateNextBtn(true);
      }
    });
    tectoRadioBtn?.addEventListener('change', (event) => {
      if (paredeRadioBtn?.checked === true || tectoRadioBtn?.checked === true) {
        updateSuporteValue('Tecto');
        if (validateSelector()) activateNextBtn(true);
      }
    });
  };

  const addOnChangeMedidasInputs = () => {
    larguraInput?.addEventListener('input', (event) => {
      if (larguraInput?.value === '' || alturaInput?.value === '') {
        return;
      }
      validateSelector() &&
        updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
      }
    });

    alturaInput?.addEventListener('input', (event) => {
      if (larguraInput?.value === '' || alturaInput?.value === '') {
        return;
      }
      validateSelector() &&
        updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
      }
    });
  };

  const addOnClickCorrecao = () => {
    correcaoInput.addEventListener('change', function (event) {
      updateSelectorValue(selectors.correcao, correcaoInput.checked);
    });
  };

  const addOnClickInstalacao = () => {
    instalacaoInput.addEventListener('change', function (event) {
      updateSelectorValue(selectors.instalacao, instalacaoInput.checked);
    });
  };

  const addOnClickStep = () => {
    Object.keys(steps).forEach((key) => {
      steps[key].addEventListener('click', () => {
        navigateToStep(key);
      });
    });
  };

  const addOnClickCheckoutChoices = () => {
    Object.keys(checkoutChoices).forEach((key) => {
      checkoutChoices[key].addEventListener('click', () => {
        if (key === 'correcao' || key === 'estoreCorrecao') {
          return;
        }
        navigateFromCheckoutToStep(key);
      });
    });
  };

  const addOnClickToWindowBtn = (window2) => {
    window2.button.addEventListener('click', () => {
      selectWindow(window2);
    });
  };

  const addOnClickEnviar = () => {
    enviarButton.addEventListener('click', async () => {
      selectorValues.nome = nomeInput.value;
      selectorValues.email = emailInput.value;
      selectorValues.contacto = contactoSwitch.checked;
      const pdfBytes = await generateAndDownloadPdf();
      await sendQuoteEmail(
        selectorValues.nome,
        selectorValues.email,
        selectorValues.contacto,
        pdfBytes
      );
    });
  };

  const addOnClickNewWindow = () => {
    newWindowButton.addEventListener('click', createWindow);
  };

  const addOnClickNoWindow = () => {
    noWindowButton.addEventListener('click', () => {
      newWindowContain.style.display = 'none';
      checkoutFormContain.style.display = 'flex';
    });
  };

  const addOnClickNextButton = () => {
    nextButton.addEventListener('click', advanceStep);
  };

  // PRICE CALCULATIONS
  // ------------------
  const calculateUsedWidth = (window2) => {
    const usedWidth = MANUFACTURING_CONSTANTS.usedWidths.find((usedWidth2) => {
      return window2.tipo === usedWidth2.name;
    });
    if (usedWidth) {
      const width = window2.medidas ? parseInt(window2.medidas.split(' X ')[0]) : 0;
      return width * usedWidth.widthRatio + MANUFACTURING_CONSTANTS.bainhaPrice.widthMargin;
    }
    return 0;
  };

  const calculateMaterialPrice = (window2, usedWidth) => {
    const width = window2.medidas.split(' X ')[0];
    let productPrice = 0,
      calhaPrice = 0;
    const prices = getProductPrice(window2);
    if (window2.inicio === 'Cortina') {
      productPrice = prices.product * (usedWidth / 100);
      calhaPrice = prices.calha;
    }
    if (window2.inicio === 'Estore') {
      productPrice = prices.product;
    }
    return { product: productPrice, calha: calhaPrice };
  };

  const calculateManufacturingPrice = (window2, usedWidth) => {
    if (window2.inicio === 'Estore') {
      return 0;
    }
    const manufacturingPrice = MANUFACTURING_CONSTANTS.manufacturingPrices.find(
      (price) => window2.tipo === price.name
    );
    if (manufacturingPrice) {
      return window2.tecido.startsWith('101')
        ? manufacturingPrice.blackout * (usedWidth / 100)
        : (window2.tecido.startsWith('120') || window2.tecido.startsWith('122')) &&
            (window2.tipo === 'Ondas' || window2.tipo === 'Franzido')
          ? manufacturingPrice.alinhado * (usedWidth / 100)
          : manufacturingPrice.normal * (usedWidth / 100);
    }
    return 0;
  };

  const calculateBainhaPrice = (window2, usedWidth) => {
    if (
      window2.inicio === 'Cortina' &&
      (window2.tecido.startsWith('120') || window2.tecido.startsWith('122'))
    ) {
      return 0;
    }
    if (window2.inicio === 'Estore') {
      return 0;
    }
    if (window2.bainha) {
      return MANUFACTURING_CONSTANTS.bainhaPrice.price * (usedWidth / 100);
    }
    return 0;
  };

  const calculateMeasuresCheckPrice = (window2) => {
    return !window2.correcao ? 0 : MANUFACTURING_CONSTANTS.measuresCheckPrice;
  };

  const calculateInstalationPrice = (window2) => {
    if (!windows[0].instalacao) {
      return 0;
    }
    let instalationPrice = 0;
    const largura = parseInt(window2.medidas.split(' X ')[0]);
    const instalationPriceDetails = MANUFACTURING_CONSTANTS.instalation.find(
      (price) => largura <= price.maxWidth
    );
    instalationPriceDetails && (instalationPrice = instalationPriceDetails.price);
    instalationPriceDetails &&
      window2.inicio === 'Cortina' &&
      window2.calha.startsWith('9500') &&
      (instalationPrice *= 2);
    return instalationPrice ? instalationPrice : 0;
  };

  const calculateWindowPrice = (window2) => {
    const totalWidth = calculateUsedWidth(window2);
    const materialPrice = calculateMaterialPrice(window2, totalWidth);
    const manufacturingPrice = calculateManufacturingPrice(window2, totalWidth);
    const bainhaPrice = calculateBainhaPrice(window2, totalWidth);
    const instalationPrice = calculateInstalationPrice(window2);
    const result =
      materialPrice.product +
      manufacturingPrice +
      bainhaPrice +
      materialPrice.calha +
      instalationPrice;
    window2.totalPrice = result;
    return {
      usedWidth: totalWidth,
      productPrice: materialPrice.product,
      manufacturingPrice,
      bainhaPrice,
      calhaPrice: materialPrice.calha,
      instalationPrice,
      windowTotal: result,
    };
  };

  // tecido 900 - 999 => Lunetas tecidos leves sem bainha de oferta,
  // 800 - 899 => tecidos sem bainhas de oferta, -> Todos os tecidos que não sejam 120 e 122 não tem bainha de oferta e custam 13.5

  // SEND EMAIL
  // ----------
  const isValidEmail = (email) => {
    const atPosition = email.indexOf('@');
    return atPosition > 0 && atPosition < email.length - 1;
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Convert Blob to Base64 string
    });
  };

  // Function to reset error messages
  const resetCheckoutErrors = () => {
    nameError.textContent = '';
    emailError.textContent = '';
    checkFieldError.textContent = '';

    // Remove error class
    nameError.classList.remove('u-text-main');
    emailError.classList.remove('u-text-main');
    checkFieldError.classList.remove('u-text-main');
  };

  // const sendQuoteEmail = async (name, email, allowsContact, pdfBytes) => {
  //   const feedbackMessage = document.getElementById('feedback-div');

  //   // const base64Pdf = base64PdfPromise
  //   //   .then((blob) => {
  //   //     return blob;
  //   //   })
  //   //   .catch((error) => console.error(error));
  //   const pdfFile = null;
  //   let errorExists = false;
  //   resetCheckoutErrors();

  //   // Validate name field
  //   if (name.trim() === '') {
  //     nameError.textContent = 'Preencher este campo obrigatório';
  //     nameError.classList.add('u-text-main');
  //     errorExists = true;
  //   }
  //   // Create checkout validator
  //   // Validate email field
  //   const emailValue = email.trim();
  //   if (emailValue === '') {
  //     emailError.textContent = 'Preencher este campo obrigatório';
  //     emailError.classList.add('u-text-main');
  //     errorExists = true;
  //   } else if (!isValidEmail(emailValue)) {
  //     emailError.textContent = 'Insira um email válido';
  //     emailError.classList.add('u-text-main');
  //     errorExists = true;
  //   }

  //   if (!errorExists) {
  //     const base64Pdf = btoa(
  //       new Uint8Array(pdfBytes).reduce((data, byte) => data + String.fromCharCode(byte), '')
  //     );

  //     const templateParams = {
  //       name: name,
  //       email: email,
  //       check: allowsContact,
  //       file: [{ base64: base64Pdf, filename: 'Orcamento_Fabric-Store.pdf' }],
  //       to_company_email: 'general@brightweb.tech', // The company's email
  //       to_user_email: email, // Send a copy to the user
  //     };

  //     emailjs.send('service_test', 'template_quote', templateParams).then(
  //       function (response) {
  //         console.log('SUCCESS!', response.status, response.text);
  //         userDetailsForm.style.display = 'none';
  //         feedbackMessage.textContent = 'Obrigado pelo seu contacto!';
  //       },
  //       function (error) {
  //         console.log('FAILED...', error);
  //         userDetailsForm.style.display = 'none';
  //         feedbackMessage.textContent = 'Oops! Algo correu mal!';
  //       }
  //     );
  //   }
  // };
  const sendQuoteEmail = async (name, email, allowsContact, base64PdfPromise) => {
    const feedbackMessage = document.getElementById('feedback-div');

    // const base64Pdf = base64PdfPromise
    //   .then((blob) => {
    //     return blob;
    //   })
    //   .catch((error) => console.error(error));
    let pdfFile = null;
    let errorExists = false;
    resetCheckoutErrors();

    // Validate name field
    if (name.trim() === '') {
      nameError.textContent = 'Preencher este campo obrigatório';
      nameError.classList.add('u-text-main');
      errorExists = true;
    }
    // Create checkout validator
    // Validate email field
    const emailValue = email.trim();
    if (emailValue === '') {
      emailError.textContent = 'Preencher este campo obrigatório';
      emailError.classList.add('u-text-main');
      errorExists = true;
    } else if (!isValidEmail(emailValue)) {
      emailError.textContent = 'Insira um email válido';
      emailError.classList.add('u-text-main');
      errorExists = true;
    }

    if (!errorExists) {
      try {
        const base64Pdf = await base64PdfPromise;
        pdfFile = await blobToBase64(base64Pdf);
      } catch {
        console.error('Failed to load PDF');
        pdfFile = null;
      }
      const templateParams = {
        name: name,
        email: email,
        check: allowsContact,
        file: [{ base64: pdfFile, filename: 'Orcamento_Fabric-Store.pdf' }],
        to_company_email: 'general@brightweb.tech', // The company's email
        to_user_email: email, // Send a copy to the user
        reply_to: 'general@brightweb.tech',
      };

      emailjs.send('service_test', 'template_quote', templateParams).then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
          userDetailsForm.style.display = 'none';
          feedbackMessage.textContent = 'Obrigado pelo seu contacto!';
        },
        function (error) {
          console.log('FAILED...', error);
          userDetailsForm.style.display = 'none';
          feedbackMessage.textContent = 'Oops! Algo correu mal!';
        }
      );
    }
  };

  // TEST DATA

  // const createDummyWindows = () => {
  //   let windowWidth = 125;
  //   for (let i = 0; i < 5; i++) {
  //     windowWidth = 125 + i * 125;
  //     windows.push({
  //       inicio: 'Cortina',
  //       tecido: '101015-003',
  //       tipo: 'Ondas',
  //       medidas: `${windowWidth} X 250`,
  //       correcao: i % 2 === 0 ? false : true,
  //       calha: '5000-Branco',
  //       instalacao: i % 2 === 0 ? true : false,
  //     });
  //   }
  // };

  // const createEddieWoodWindows = () => {
  //   windows.push({
  //     inicio: 'Cortina',
  //     tecido: '120100-008',
  //     tipo: 'Franzido',
  //     medidas: `200 X 250`,
  //     correcao: true,
  //     calha: '5000-B',
  //     instalacao: true,
  //   });
  // };

  // const createRitaAbreuWindows = () => {
  //   const ritaAbreuWindows = [
  //     {
  //       inicio: 'Cortina',
  //       tecido: '120100-008',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `285 X 150`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '120100-008',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `240 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '120100-008',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `285 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '120100-008',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `280 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '120100-008',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `285 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //   ];
  //   emailInput.value = 'ritabreu@test.pt';
  //   nomeInput.value = 'Rita Abreu';
  //   windows.push(...ritaAbreuWindows);
  // };

  // const createRitaAbreuWindows2 = () => {
  //   const ritaAbreuWindows = [
  //     {
  //       inicio: 'Cortina',
  //       tecido: '118060-024',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `285 X 150`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '118060-024',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `348 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '118060-024',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `240 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '118060-024',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `285 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '118060-024',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `280 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //     {
  //       inicio: 'Cortina',
  //       tecido: '118060-024',
  //       tipo: 'Ondas',
  //       bainha: true,
  //       medidas: `285 X 268`,
  //       correcao: true,
  //       calha: '5000-B',
  //       suporte: 'Parede',
  //       instalacao: true,
  //     },
  //   ];
  //   emailInput.value = 'ritabreu@test.pt';
  //   nomeInput.value = 'Rita Abreu';
  //   windows.push(...ritaAbreuWindows);
  // };

  // const createMafaldaCoelhoWindows = () => {
  //   const mafaldaCoelhoWindows = [
  //     {
  //       inicio: 'Cortina',
  //       tecido: '120100-008',
  //       tipo: 'Ondas',
  //       medidas: `360 X 150`,
  //       correcao: false,
  //       calha: '5000-B',
  //       instalacao: false,
  //     },
  //   ];
  //   windows.push(...mafaldaCoelhoWindows);
  // };

  // const createHelderPintoWindows = () => {
  //   const helderPintoWindows = [
  //     {
  //       inicio: 'Cortina',
  //       tecido: '120100-008',
  //       tipo: 'Ondas',
  //       medidas: `350 X 240`,
  //       correcao: true,
  //       calha: '5000-B',
  //       instalacao: true,
  //     },
  //   ];
  //   windows.push(...helderPintoWindows);
  // };

  onInit();
  // createRitaAbreuWindows();
});
