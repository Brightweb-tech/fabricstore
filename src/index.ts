window.Webflow ||= [];

window.Webflow.push(() => {
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
        150, 200, 250, 300, 350, 400, 450, 500, 600, 650, 700, 750, 800, 850, 900, 1000, 1200,
      ],
      KS: [160, 200, 240, 300, 400, 500, 600],
      'DSXL-B': [160, 200, 240, 300, 400, 600],
      'DSXL-CZ': [160, 200, 240, 300, 400, 600],
      'DSXL-P': [160, 200, 240, 300, 400, 600],
    },
  };

  const selectedColors = [];

  const simulatorHeadings = {
    step1: document.getElementById('simulator-heading-1'),
    step2: document.getElementById('simulator-heading-2'),
    step3: document.getElementById('simulator-heading-3'),
    step4: document.getElementById('simulator-heading-4'),
    step5: document.getElementById('simulator-heading-5'),
  };

  const selectors = {
    inicio: document.getElementById('inicio-selector'), // deactivate inicio cards
    tecido: document.getElementById('tecido-selector'), // deactivate product cards and colors
    tipo: document.getElementById('tipo-selector'), // deactivate tipo cards
    bainha: document.getElementById('bainha-selector'), // uncheck the bainha checkbox
    medidas: document.getElementById('medidas-selector'), // reset the value of the inputs
    correcao: document.getElementById('correcao-selector'),
    suporte: document.getElementById('suporte-selector'),
    instalacao: document.getElementById('instalacao-selector'), // uncheck the instalacao checkbox
  };

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

  // Inputs
  const larguraInput = document.getElementById('largura-input');
  const alturaInput = document.getElementById('altura-input');
  const correcaoInput = document.querySelector('#correcao-switch');
  const instalacaoInput = document.querySelector('#instalacao-switch');
  const bainhaInput = document.querySelector('#bainha');
  const nomeInput = document.getElementById('nome-input');
  const emailInput = document.getElementById('email-input');
  const contactoSwitch = document.getElementById('contacto-switch');
  const cortinaRadioBtn = document.getElementById('cortina-radio-btn');
  const estoreRadioBtn = document.getElementById('estore-radio-btn');
  const calhaRadioBtn = document.getElementById('calha-radio-btn');

  const tectoRadioBtn = document.getElementById('tecto-radio-btn');
  const paredeRadioBtn = document.getElementById('parede-radio-btn');

  // Flow elements
  const nextButton = document.getElementById('seguinte-btn');
  const simContainer = document.getElementById('sim-container');

  // Checkout elements
  const checkoutContain = document.getElementById('checkout-container');
  const newWindowContain = document.getElementById('new-window-contain');
  const checkoutFormContain = document.getElementById('checkout-input-contain');
  const newWindowButton = document.getElementById('new-window-btn');
  const noWindowButton = document.getElementById('no-window-btn');
  const enviarButton = document.getElementById('enviar-btn');

  const windows = [];

  const steps = {
    tecido: document.getElementById('step-tecido'),
    tipo: document.getElementById('step-tipo'),
    medidas: document.getElementById('step-medidas'),
    calha: document.getElementById('step-calha'),
    instalacao: document.getElementById('step-instalacao'),
  };

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
  };

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
      },
      {
        name: 'Pregas',
        normal: 13.5,
        blackout: 13.5,
      },
    ],
    bainhaPrice: {
      price: 3.5,
      widthMargin: 20,
    },
    uniao: {
      maxLength: 400,
      price: 8.6,
    },
    prolongadores: 3.7,
    roletesPrice: 5,
    minWindowWidth: 80,
    maxWindowWidth: 650,
    minWindowHeight: 80,
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

  const calculateUsedWidth = (window) => {
    const usedWidth = MANUFACTURING_CONSTANTS.usedWidths.find((usedWidth) => {
      return window.tipo === usedWidth.name;
    });
    // if (usedWidth) {
    //   const width = window.medidas ? parseInt(window.medidas.split(' X ')[0]) + MANUFACTURING_CONSTANTS.bainhaPrice.widthMargin : 0;
    //   return width * usedWidth.widthRatio;
    // }
    if (usedWidth) {
      const width = window.medidas ? parseInt(window.medidas.split(' X ')[0]) : 0;
      return width * usedWidth.widthRatio + MANUFACTURING_CONSTANTS.bainhaPrice.widthMargin;
    }
    return 0;
  };

  const getVariableEstoreReference = (product, color, width, height) => {
    // get closest superior number of width and height from the productSizes for estores
    const closestWidth = productSizes.estores.width.find((w) => w >= width);
    const closestHeight = productSizes.estores.height.find((h) => h >= height);
    return `${product}${closestHeight}${closestWidth}`;
  };

  const getVariableCalhaReference = (product, type, color, width, isWallMounted) => {
    // get closest superior number of width and height from the productSizes for estores
    if (product === 'KS') {
      if (isWallMounted) {
        const closestWidth = productSizes.calhas[product]?.find((w) => w >= width);
        return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth}SP`;
      }
      const closestWidth = productSizes.calhas[product]?.find((w) => w >= width);
      return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth}`;
    }
    if (product === 'DSXL') {
      if (isWallMounted) {
        const closestWidth = productSizes.calhas[`${product}-${color}`]?.find((w) => w >= width);
        return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth}${color}SP`;
      }
      const closestWidth = productSizes.calhas[`${product}-${color}`]?.find((w) => w >= width);
      return `${product}${type === 'Franzido' ? 'F' : 'O'}${closestWidth}${color}`;
    }
    if (product === '9500M') {
      if (isWallMounted) {
        const closestWidth = productSizes.calhas[product].find((w) => w >= width);
        return `${product}${closestWidth}SP`;
      }
      const closestWidth = productSizes.calhas[product].find((w) => w >= width);
      return `${product}${closestWidth}`;
    }
    if (isWallMounted) {
      const closestWidth = productSizes.calhas[`${product}-${color}`].find((w) => w >= width);
      return `${product}${closestWidth}${color}SP`;
    }
    const closestWidth = productSizes.calhas[`${product}-${color}`].find((w) => w >= width);
    return `${product}${closestWidth}${color}`;
  };

  const convertCalhaColor = (color) => {
    return calhaColors[color];
  };

  const getProductPrice = (window) => {
    let productPrice = 0.0,
      calhaPrice = 0.0,
      reference = '';

    const productDetails = window.tecido.split('-');
    const product = productDetails[0];
    const color = productDetails[1];
    const calhaDetails = window.calha ? window.calha.split('-') : null;
    const calha = calhaDetails ? calhaDetails[0] : null;
    const calhaColor = calhaDetails ? calhaDetails[1] : null;
    const width = window.medidas ? window.medidas.split(' X ')[0] : 0;

    if (window.inicio === 'Cortina') {
      reference = `${product}${color}`;
    }

    if (window.inicio === 'Estore') {
      const height = window.medidas ? window.medidas.split(' X ')[1] : 0;
      reference = getVariableEstoreReference(product, color, width, height);
    }
    productPrice =
      typeof productsData[reference].price === 'string'
        ? parseFloat(productsData[reference].price)
        : productsData[reference].price;

    if (window.inicio === 'Estore') {
      return { product: productPrice, calha: 0 };
    }

    const calhaMultiplier = ((width / MANUFACTURING_CONSTANTS.maxCalhaWidth) | 0) + 1;

    const calhaWidth =
      width <= MANUFACTURING_CONSTANTS.maxCalhaWidth ? width : width / calhaMultiplier;

    const calhaReference = getVariableCalhaReference(
      calha,
      window.tipo,
      calhaColor,
      calhaWidth,
      window?.suporte === 'Parede' ? true : false
    );

    // Preço da referencia da calha
    calhaPrice = !productsData[calhaReference]
      ? 0
      : width < MANUFACTURING_CONSTANTS.maxCalhaWidth
        ? productsData[calhaReference].price
        : productsData[calhaReference].price * calhaMultiplier;

    // Preço da união da calha
    calhaPrice +=
      width > MANUFACTURING_CONSTANTS.maxCalhaWidth
        ? MANUFACTURING_CONSTANTS.prolongadores * calhaMultiplier
        : width > MANUFACTURING_CONSTANTS.uniao.maxLength
          ? MANUFACTURING_CONSTANTS.uniao.price * calhaMultiplier
          : 0;

    // Preço dos roletes de latão da calha
    (calhaReference.startsWith('5000') || calhaReference.startsWith('1500')) &&
      (calhaPrice +=
        width < MANUFACTURING_CONSTANTS.maxCalhaWidth
          ? MANUFACTURING_CONSTANTS.roletesPrice
          : MANUFACTURING_CONSTANTS.roletesPrice * calhaMultiplier);
    return { product: productPrice, calha: calhaPrice };
  };

  const calculateMaterialPrice = (window, usedWidth) => {
    const width = window.medidas.split(' X ')[0];
    let productPrice = 0.0,
      calhaPrice = 0.0;
    const prices = getProductPrice(window);

    if (window.inicio === 'Cortina') {
      productPrice = prices.product * (usedWidth / 100);
      calhaPrice = prices.calha;
    }
    if (window.inicio === 'Estore') {
      productPrice = prices.product;
    }
    return { product: productPrice, calha: calhaPrice };
  };

  const calculateManufacturingPrice = (window, usedWidth) => {
    if (window.inicio === 'Estore') {
      return 0;
    }
    const manufacturingPrice = MANUFACTURING_CONSTANTS.manufacturingPrices.find(
      (price) => window.tipo === price.name
    );
    if (manufacturingPrice) {
      return window.tecido.startsWith('101')
        ? manufacturingPrice.blackout * (usedWidth / 100)
        : manufacturingPrice.normal * (usedWidth / 100);
    }

    return 0;
  };

  const calculateBainhaPrice = (window, usedWidth) => {
    if (
      window.inicio === 'Cortina' &&
      (window.tecido.startsWith('120') || window.tecido.startsWith('122'))
    ) {
      return 0;
    }
    if (window.inicio === 'Estore') {
      return 0;
    }
    if (window.bainha) {
      return MANUFACTURING_CONSTANTS.bainhaPrice.price * (usedWidth / 100);
    }
    return 0;
  };

  const calculateMeasuresCheckPrice = (window) => {
    return !window.correcao ? 0 : MANUFACTURING_CONSTANTS.measuresCheckPrice;
  };

  const calculateInstalationPrice = (window) => {
    if (!windows[0].instalacao) {
      return 0;
    }
    const largura = parseInt(window.medidas.split(' X ')[0]);

    const instalationPrice = MANUFACTURING_CONSTANTS.instalation.find(
      (price) => largura <= price.maxWidth
    );
    return instalationPrice ? instalationPrice.price : 0;
  };

  const calculateWindowPrice = (window) => {
    const totalWidth = calculateUsedWidth(window);
    const materialPrice = calculateMaterialPrice(window, totalWidth);
    const manufacturingPrice = calculateManufacturingPrice(window, totalWidth);
    const bainhaPrice = calculateBainhaPrice(window, totalWidth);
    // const measuresCheckPrice = calculateMeasuresCheckPrice(window);
    const instalationPrice = calculateInstalationPrice(window);
    // const result = materialPrice + manufacturingPrice + instalationPrice;
    const result =
      materialPrice.product +
      manufacturingPrice +
      bainhaPrice +
      materialPrice.calha +
      instalationPrice;
    window.totalPrice = result;
    // return result;
    return {
      usedWidth: totalWidth,
      productPrice: materialPrice.product,
      manufacturingPrice: manufacturingPrice,
      bainhaPrice: bainhaPrice,
      calhaPrice: materialPrice.calha,
      instalationPrice: instalationPrice,
      windowTotal: result,
    };
  };

  const changeSelectorVisibility = (selector, visible) => {
    selector.style.display = visible ? 'flex' : 'none';
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
          alert('Preencha valores válidos de largura e altura');
          activateNextBtn(false);
          return false;
        }
        if (parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidth) {
          alert('Largura máxima excedida');
          activateNextBtn(false);
          return false;
        }
        if (parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeight) {
          alert('Altura máxima excedida');
          activateNextBtn(false);
          return false;
        }
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
    steps[step].getElementsByClassName('step_description')[0].textContent = selectorValues[step];
    // eslint-disable-next-line prettier/prettier
    if (step === 'medidas')
      steps[step].getElementsByClassName('step_description')[0].textContent +=
        selectorValues.correcao ? 'c/Verificação' : 's/Verificação';
    // eslint-disable-next-line prettier/prettier
    if (step === 'tipo')
      steps[step].getElementsByClassName('step_description')[0].textContent += selectorValues.bainha
        ? 'c/Baínha de Chumbo'
        : 's/Baínha de Chumbo';
  };

  const markStepAsActive = (step) => {
    steps[step].classList.remove('next');
    steps[step].classList.add('active');
    steps[step].getElementsByClassName('step_number')[0].classList.add('active');
  };

  const markStepAsNext = (step) => {
    if (steps[step].classList.contains('active')) {
      steps[step].classList.remove('active');
      steps[step].getElementsByClassName('step_number')[0].classList.remove('active');
    }
    if (steps[step].classList.contains('done')) return markStepAsCompleted(step);
    steps[step].classList.add('next');
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

  const populateSelectorValues = (window) => {
    Object.keys(window).forEach((key) => {
      updateSelectorValue(selectors.medidas, window[key]);
    });
  };

  const populateInputValues = (window) => {
    selectInicio(window.inicio);
    selectProduct(window.tecido);
    selectTipo(window.tipo);
    bainhaInput.checked = window.bainha;
    larguraInput.value = window.medidas.split(' X ')[0];
    alturaInput.value = window.medidas.split(' X ')[1];
    correcaoInput.checked = window.correcao;
    selectSuporte(window.suporte);
    instalacaoInput.checked = window.instalacao;
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

  const advanceStep = () => {
    if (selectorValues.inicio === 'Cortina') {
      switch (currentStep) {
        case 'inicio':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.inicio, false);
            activateNextBtn(false);
            changeSelectorVisibility(selectors.tecido, true);
            currentStep = 'tecido';
          }
          break;
        case 'tecido':
          if (validateSelector()) {
            markStepAsCompleted('tecido');
            markStepAsActive('tipo');
            changeSelectorVisibility(simulatorHeadings.step1, false);
            activateNextBtn(false);
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
              activateNextBtn(false);
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
          activateNextBtn(false);
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
              activateNextBtn(false);
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
          activateNextBtn(false);
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.tecido, true);
          currentStep = 'calha';
          break;
        case 'calha':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.tecido, false);
            activateNextBtn(false);
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
              storeValues();
              createWindowBtnCheckout();
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
          storeValues();
          createWindowBtnCheckout();
          navigateToCheckout();
          break;
      }
    } else {
      switch (currentStep) {
        case 'inicio':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.inicio, false);
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
            storeValues();
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
          storeValues();
          createWindowBtnCheckout();
          navigateToCheckout();
          break;
      }
    }
  };

  const clearSuporteRadioBtns = () => {
    tectoRadioBtn.checked = false;
    paredeRadioBtn.checked = false;
  };

  const createWindowBtnCheckout = () => {
    const windowBtn = document.querySelector('#checkout-window-btn'); // Select the div you want to duplicate
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
        // Append the cloned div to the parent container
        windowbtnsContainer?.appendChild(clonedBtn);
      }
    }
  };

  const addOnClickToWindowBtn = (window) => {
    window.button.addEventListener('click', () => {
      selectWindow(window);
    });
  };

  const selectWindow = (window) => {
    windows.forEach((w) => {
      if (w.button) {
        w.button.classList.remove('active');
      }
    });
    window.button.classList.add('active');
    populateCheckoutChoices(window);
  };

  const navigateToCheckout = () => {
    simContainer.style.display = 'none';
    selectWindow(windows[windows.length - 1]);
    checkoutContain.style.display = 'flex';
  };

  const navigateFromCheckoutToStep = (step) => {
    checkoutContain.style.display = 'none';
    resetSteps();
    simContainer.style.display = 'flex';

    if (step === 'largura' || step === 'altura') {
      step = 'medidas';
    }
    switch (step) {
      case 'inicio':
        changeSelectorVisibility(simulatorHeadings.step1, true);
        changeSelectorVisibility(selectors.inicio, true);
        break;
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
    if (currentStep === 'inicio') {
      return markStepAsActive('tecido');
    }
    markStepAsActive(step);
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

  const updateProductsCMSFilter = (productType) => {
    if (productType === 'Estore') {
      estoreRadioBtn?.click(); // Trigger the click event
    }
    if (productType === 'Cortina') {
      cortinaRadioBtn?.click(); // Trigger the click event
    }
    if (productType === 'Calha') {
      calhaRadioBtn?.click(); // Trigger the click event
    }
  };

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

    // activateColor(selectedDiv);
    // colors.forEach((colorFromList) => {
    //   if (colorFromList !== selectedDiv) {
    //     deactivateColor(colorFromList);
    //   }
    // });
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
              // cardColors.item(i).click();
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
          // cardColors.length > 0 && cardColors[0].click();
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

  const getColorFromCard = (card) => {
    const colorText = card.getElementsByClassName('color_name');
    return colorText.length > 0 ? colorText[0].textContent : null;
  };

  const getProductFromCard = (card) => {
    const productText = card.getElementsByClassName('product_name');
    return productText.length > 0 ? productText[0].textContent : null;
  };

  const addOnClickToCalhaCards = () => {
    const cards = document.querySelectorAll("[id^='calha-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        activateCard(card, selectors.calha);
        cards.forEach((cardFromList) => {
          if (cardFromList !== card) {
            deactivateCard(cardFromList);
          }
        });
        updateSelectorValue(selectors.calha, card.getElementsByTagName('h1')[0].textContent);
        // if (validateSelector()) activateNextBtn(true);
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
        // const color = selectedColor ? selectedColor.split('-')[1] : '';
        const latestSelection = selectedColors.find((color) => color.product === product);

        if (latestSelection) {
          latestSelection.color = `${selectedColor}`;
        } else {
          selectedColors.push({ product: product, color: `${selectedColor}` });
        }

        const cardThumbnailImage =
          selectedDiv.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
            'tecido_image'
          )[0];

        // const colorsThumbnailImages = document.querySelectorAll("[id^='color-thumbnail-image']");

        // for (let i = 0; i < colorsThumbnailImages.length; i++) {
        //   if (colorsThumbnailImages[i].textContent === selectedColor) {
        //     cardThumbnailImage.setAttribute(
        //       'src',
        //       colorsThumbnailImages[i].style.backgroundImage.split('"')[1]
        //     );
        //     cardThumbnailImage.setAttribute('srcset', '');
        //     break;
        //   }
        // }

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

  const populateCheckoutChoices = (window) => {
    checkoutChoices.tecido.textContent = window.tecido;
    checkoutChoices.tipo.textContent = window.tipo;
    checkoutChoices.bainha.textContent =
      window.tipo === 'Ondas' || windows.tipo === 'Franzido'
        ? 'Baínha de Chumbo incluída'
        : window.bainha
          ? 'Com Baínha de Chumbo'
          : 'Sem Baínha de Chumbo';
    checkoutChoices.largura.textContent = window.medidas.split(' X ')[0] + 'cm Largura';
    checkoutChoices.altura.textContent = window.medidas.split(' X ')[1] + 'cm Altura';
    checkoutChoices.correcao.textContent = windows[0].correcao
      ? 'Com Verificação'
      : 'Sem Verificação';
    checkoutChoices.calha.textContent = window.calha;
    checkoutChoices.suporte.textContent = 'Suporte de ' + window.suporte;
    checkoutChoices.instalacao.textContent = windows[0].instalacao
      ? 'Com Instalação'
      : 'Sem Instalação';
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
        navigateFromCheckoutToStep(key);
      });
    });
  };

  const addOnClickEnviar = () => {
    enviarButton.addEventListener('click', () => {
      selectorValues.nome = nomeInput.value;
      selectorValues.email = emailInput.value;
      selectorValues.contacto = contactoSwitch.checked;
      generateAndDownloadPdf();
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
      if (larguraInput?.value === '' && alturaInput?.value === '') {
        return;
      }
      if (
        parseInt(larguraInput?.value) <= MANUFACTURING_CONSTANTS.minWindowWidth ||
        parseInt(alturaInput?.value) <= MANUFACTURING_CONSTANTS.minWindowHeight
      ) {
        return;
      }
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
      }
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
      }
      // if (larguraInput?.value === '' || alturaInput?.value === '') {
      //   activateNextBtn(false);
      // } else {
      //   activateNextBtn(true);
      // }
    });

    alturaInput?.addEventListener('input', (event) => {
      if (larguraInput?.value === '' && alturaInput?.value === '') {
        return;
      }
      if (
        parseInt(larguraInput?.value) <= MANUFACTURING_CONSTANTS.minWindowWidth ||
        parseInt(alturaInput?.value) <= MANUFACTURING_CONSTANTS.minWindowHeight
      ) {
        return;
      }
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
      }
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
      }
    });
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
  };

  const createWindow = () => {
    updateProductsCMSFilter('Cortina');
    resetValues();
    resetInputs();
    navigateFromCheckoutToStep('inicio');
  };
  const generateAndDownloadPdf = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const x = 10; // X-coordinate for text
    const rightMargin = 190; // Right margin for text (width of the PDF - x)
    let y = 10; // Y-coordinate for text
    const lineHeight = 6; // Space between lines
    let total = 0;
    doc.setFontSize(12);
    doc.text('Data: ' + new Date().toLocaleDateString(), rightMargin - 40, y);
    doc.text('Cliente: ' + selectorValues.nome, x, y);
    y += lineHeight;
    doc.text('Email: ' + selectorValues.email, x, y);
    y += lineHeight * 2;

    // Start of Table
    windows.forEach((window, index) => {
      if (index % 6 === 0 && index !== 0) {
        doc.addPage();
        y = 10;
      }
      const {
        usedWidth,
        productPrice,
        manufacturingPrice,
        bainhaPrice,
        calhaPrice,
        instalationPrice,
        windowTotal,
      } = calculateWindowPrice(window);
      total += windowTotal;

      // Main Row: Window Description
      const windowDescription = `Janela ${index + 1} - ${window.medidas} CM - (Largura Utilizada: ${parseInt(parseFloat(usedWidth).toFixed(2))} CM)`;
      doc.setFontSize(10);
      doc.text(windowDescription, x, y);
      doc.text(`${windowTotal.toFixed(2)}€`, x + 150, y);
      y += lineHeight;

      // Subitems: Tecido, Tipo - Bainha, Calha - Suporte, Instalação
      const subItems = [
        { label: `Tecido: ${window.tecido}`, price: productPrice },
        {
          label: `Tipo de Cortina: ${window.tipo}`,
          price: manufacturingPrice,
        },
        {
          label: `Baínha de Chumbo: ${window.tecido.startsWith('120') || window.tecido.startsWith('122') ? 'Incluída' : window.bainha ? 'Sim' : 'Não'}`,
          price: bainhaPrice,
        },
        {
          label: `Calha: ${window.calha} - Suporte: Suporte de ${window.suporte}`,
          price: calhaPrice,
        },
        { label: `Instalação: ${windows[0].instalacao ? 'Sim' : 'Não'}`, price: instalationPrice },
      ];

      subItems.forEach((item) => {
        doc.setFontSize(8);
        doc.text(`  - ${item.label}`, x + 5, y); // Indented for subitems
        doc.text(`${item.price.toFixed(2)}€`, x + 150, y);
        y += lineHeight;
      });

      y += lineHeight; // Space between windows
    });
    if (!windows.length === 6) {
      y += lineHeight;
    }
    doc.setFontSize(10);
    doc.text('Correção:', x, y);
    doc.text(`${windows[0].correcao ? 30 : 0}€`, x + 150, y);
    y += lineHeight;
    y += lineHeight;
    // Highlighted Total Line
    total += windows[0].correcao ? 30 : 0;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(240, 240, 240); // Light grey background
    doc.rect(x, y, 190, lineHeight + 2, 'F'); // Background for the total line
    doc.text(`Total:`, x + 120, y + lineHeight - 2);
    doc.text(`${total.toFixed(2)}€`, x + 150, y + lineHeight - 2);
    doc.save('generated.pdf');
  };

  const createDummyWindows = () => {
    let windowWidth = 125;
    for (let i = 0; i < 5; i++) {
      windowWidth = 125 + i * 125;
      windows.push({
        inicio: 'Cortina',
        tecido: '101015-003',
        tipo: 'Ondas',
        medidas: `${windowWidth} X 250`,
        correcao: i % 2 === 0 ? false : true,
        calha: '5000-Branco',
        instalacao: i % 2 === 0 ? true : false,
      });
    }
  };
  const createEddieWoodWindows = () => {
    windows.push({
      inicio: 'Cortina',
      tecido: '120100-008',
      tipo: 'Franzido',
      medidas: `200 X 250`,
      correcao: true,
      calha: '5000-B',
      instalacao: true,
    });
  };

  const createRitaAbreuWindows = () => {
    const ritaAbreuWindows = [
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        bainha: true,
        medidas: `285 X 150`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        bainha: true,
        medidas: `348 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        bainha: true,
        medidas: `240 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        bainha: true,
        medidas: `285 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        bainha: true,
        medidas: `280 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        bainha: true,
        medidas: `285 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
    ];
    emailInput.value = 'ritabreu@test.pt';
    nomeInput.value = 'Rita Abreu';

    windows.push(...ritaAbreuWindows);
  };
  const createRitaAbreuWindows2 = () => {
    const ritaAbreuWindows = [
      {
        inicio: 'Cortina',
        tecido: '118060-024',
        tipo: 'Ondas',
        bainha: true,
        medidas: `285 X 150`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '118060-024',
        tipo: 'Ondas',
        bainha: true,
        medidas: `348 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '118060-024',
        tipo: 'Ondas',
        bainha: true,
        medidas: `240 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '118060-024',
        tipo: 'Ondas',
        bainha: true,
        medidas: `285 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '118060-024',
        tipo: 'Ondas',
        bainha: true,
        medidas: `280 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
      {
        inicio: 'Cortina',
        tecido: '118060-024',
        tipo: 'Ondas',
        bainha: true,
        medidas: `285 X 268`,
        correcao: true,
        calha: '5000-B',
        suporte: 'Parede',
        instalacao: true,
      },
    ];
    emailInput.value = 'ritabreu@test.pt';
    nomeInput.value = 'Rita Abreu';

    windows.push(...ritaAbreuWindows);
  };
  const createMafaldaCoelhoWindows = () => {
    const mafaldaCoelhoWindows = [
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        medidas: `360 X 150`,
        correcao: false,
        calha: '5000-B',
        instalacao: false,
      },
    ];
    windows.push(...mafaldaCoelhoWindows);
  };
  const createHelderPintoWindows = () => {
    const helderPintoWindows = [
      {
        inicio: 'Cortina',
        tecido: '120100-008',
        tipo: 'Ondas',
        medidas: `350 X 240`,
        correcao: true,
        calha: '5000-B',
        instalacao: true,
      },
    ];
    windows.push(...helderPintoWindows);
  };
  const fetchProducts = () => {
    // 'https://docs.google.com/spreadsheets/d/1rLeS62q8uY3PPSRZSEokJY7q5uS4Qh9aNx8VFPg2cF8/export?format=csv'
    // `https://docs.google.com/spreadsheets/d/1acI1UfB7ukEPc2r4Sf_s4pax0um2IsVvlGDGaiMSNIU/export?format=csv&gid=2133468022`
    // `https://docs.google.com/spreadsheets/d/1BeQJvMh5moFM9ELRQG7QsDUa_CLfiqZ9/export?format=csv&gid=2133468022`
    // `https://docs.google.com/spreadsheets/d/1acI1UfB7ukEPc2r4Sf_s4pax0um2IsVvlGDGaiMSNIU/export?format=csv&gid=2133468022`
    fetch(
      `https://docs.google.com/spreadsheets/d/1hkgiYOVj33yY6b--bJaNPZOvHFvQ4klM402z0xp-gjE/export?format=csv&gid=0&single=true`
    )
      .then((response) => response.text())
      .then((csvData) => {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map((line) => line.split(','));
        // Create the JSON structure
        const jsonData = {};

        data.forEach((row) => {
          const [id, price] = row;
          if (!jsonData[id]) {
            jsonData[id] = { id: id, price: parseFloat(price) };
          }
        });

        productsData = jsonData;
      })
      .catch((error) => console.error('Error fetching CSV data:', error));
  };

  const addOnClickNextButton = () => {
    nextButton.addEventListener('click', advanceStep);
  };

  // const addCMSFilterUpdateListener = () => {
  //   document.addEventListener('renderitems', function () {
  //     swiper.update();
  //   });
  // };

  fetchProducts();
  addOnClickNextButton();
  addOnClickToInicioCards();
  addOnClickToTecidoCards();
  addOnClickToCalhaCards();
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
  // addCMSFilterUpdateListener();
  // createEddieWoodWindows();
  // createRitaAbreuWindows2();
  // createMafaldaCoelhoWindows();
  // createHelderPintoWindows();
});
