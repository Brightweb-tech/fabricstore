window.Webflow ||= [];
window.Webflow.push(() => {
  // ----------------------------
  //  DATA MODELS AND CONSTANTS
  // ----------------------------
  const logoUrl =
    'https://cdn.prod.website-files.com/66aadbd497db3d8c63799460/66f69f0aaa45e095bd2e0f3f_LOGOTIPO%20FABRICSTORE_color%201.png';
  // 'https://cdn.prod.website-files.com/66aadbd497db3d8c63799460/66eb5ac454e950633d646ea2_testlogo.jpg';
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
    estoresJaponeses: {
      width: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400],
    },
    estores: {
      width: [
        80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260,
        270, 280, 290, 300,
      ],
      height: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320],
    },
    calhas: {
      'VARAO-P': [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
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
  const files = [];
  const windows = [];
  let currentWindowIndex = 0;
  let currentStep = 'inicio';
  const selectorValues = {
    inicio: '',
    tecido: '',
    tipo: '',
    bainha: '',
    forma: '',
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
    manufacturingPrices: {
      japaneseBlind: 20,
      curtains: [
        {
          name: 'Franzido',
          blackout: 9,
          normal: 8,
          alinhado: 8,
        },
        {
          name: 'Ondas',
          blackout: 8.5,
          normal: 7.5,
          alinhado: 7.5,
        },
        {
          name: 'Macho Juntos',
          normal: 12.5,
          blackout: 13.5,
          alinhado: 12.5,
        },
        {
          name: 'Pregas',
          normal: 12.5,
          blackout: 13.5,
          alinhado: 12.5,
        },
      ],
      towels: {
        circle: {
          normal: [
            { maxWidth: 200, price: 8 },
            { maxWidth: 280, price: 10 },
          ],
        },
        square: {
          normal: [
            { maxWidth: 150, price: 5 },
            { maxWidth: 200, price: 6 },
            { maxWidth: 250, price: 8 },
            { maxWidth: 280, price: 9 },
          ],
          cantos: [
            { maxWidth: 150, price: 6.5 },
            { maxWidth: 200, price: 8 },
            { maxWidth: 250, price: 10 },
            { maxWidth: 280, price: 14 },
          ],
        },
        retangle: {
          normal: [
            { maxWidth: 280, price: 5 },
            { maxWidth: 400, price: 7 },
            { maxWidth: 500, price: 8.5 },
          ],
          cantos: [
            { maxWidth: 280, price: 8 },
            { maxWidth: 400, price: 12.5 },
            { maxWidth: 500, price: 14.5 },
            { maxWidth: 600, price: 16.5 },
          ],
        },
      }
    },
    bainhaPrice: {
      price: 3.5,
      widthMargin: 20,
    },
    bainhaEstoreJaponesPrice: {
      price: 3.5,
      widthMargin: 30,
    },
    uniao: {
      maxLength: 400,
      price: 8.6,
      calha9500M: 15,
    },
    prolongadores: 3.7,
    roletesPrice: 5,

    bainhaToalhas: {
      normal: { price: 3.5, widthMargin: 10 },
      cantos: { price: 5, widthMargin: 15 },
    },
    maxWidthToalhasNoPriceIncrease: 170,
    minWidthToalhas: 0,
    maxWidthToalhas: 280,
    minLengthToalhas: 0,
    maxLengthToalhas: 4000,

    minTowelMargin: 0,
    maxTowelMargin: 75,

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
  const toalhaSteps = document.getElementById('steps-toalha');

  // Headings
  const simulatorHeadings = {
    step1: document.getElementById('simulator-heading-1'),
    step1i: document.getElementById('inicio-description'),
    step1c: document.getElementById('inicio-description-c'),
    step1e: document.getElementById('inicio-description-e'),
    step2: document.getElementById('simulator-heading-2'),
    step2t: document.getElementById('tipo-description'),
    step2b: document.getElementById('bainha-description'),
    step2toalha: document.getElementById('simulator-heading-2-toalha'),
    step2f: document.getElementById('forma-description'),
    step2bt: document.getElementById('bainha-toalha-description'),
    step3: document.getElementById('simulator-heading-3'),
    step3m: document.getElementById('medidas-description'),
    step3c: document.getElementById('correcao-description'),
    step4: document.getElementById('simulator-heading-4'),
    step4c: document.getElementById('calha-description'),
    step4s: document.getElementById('suporte-description'),
    step5: document.getElementById('simulator-heading-5'),
    step5i: document.getElementById('instalacao-description'),
  };

  // Selectors
  const selectors = {
    inicio: document.getElementById('inicio-selector'),
    tecido: document.getElementById('tecido-selector'),
    tipo: document.getElementById('tipo-selector'),
    forma: document.getElementById('forma-selector'),
    bainha: document.getElementById('bainha-selector'),
    medidas: document.getElementById('medidas-selector'),
    correcao: document.getElementById('correcao-selector'),
    suporte: document.getElementById('suporte-selector'),
    instalacao: document.getElementById('instalacao-selector'),
  };

  // Inputs Descriptions
  const larguraInputDescrC = document.getElementById('largura-input-descr-c');
  const alturaInputDescrC = document.getElementById('altura-input-descr-c');
  const larguraInputDescrE = document.getElementById('largura-input-descr-e');
  const alturaInputDescrE = document.getElementById('altura-input-descr-e');

  // Inputs
  const larguraInput = document.getElementById('largura-input');
  const alturaInput = document.getElementById('altura-input');
  const margemInput = document.getElementById('margem-input');
  const larguraContain = document.getElementById('largura-contain');
  const alturaContain = document.getElementById('altura-contain');
  const margemContain = document.getElementById('margem-contain');
  const correcaoInput = document.querySelector('#correcao-switch');
  const bainhaInput = document.querySelector('#bainha');
  const tectoRadioBtn = document.getElementById('tecto-radio-btn');
  const paredeRadioBtn = document.getElementById('parede-radio-btn');
  const instalacaoInput = document.querySelector('#instalacao-switch');
  const bainhaCards = document.getElementById('bainha-toalha');
  const bainhaForm = document.getElementById('bainha-form');

  // Error Messages
  const larguraMinErrorEstore = document.getElementById('largura-min-error-estore');
  const alturaMinErrorEstore = document.getElementById('altura-min-error-estore');
  const larguraMaxErrorEstore = document.getElementById('largura-max-error-estore');
  const alturaMaxErrorEstore = document.getElementById('altura-max-error-estore');
  const margemMinError = document.getElementById('margem-min-error');
  const margemMaxError = document.getElementById('margem-max-error');
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
    medidasToalha: document.getElementById('step-medidas-toalha'),
    forma: document.getElementById('step-forma-toalha'),
    // instalacaoToalha: document.getElementById('step-instalacao-toalha'),
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
  const checkoutInfoToalha = document.getElementById('checkout-info-toalha');

  // Buttons
  const newWindowButton = document.getElementById('new-window-btn');
  const noWindowButton = document.getElementById('no-window-btn');
  const enviarButton = document.getElementById('enviar-btn');
  const downloadButton = document.getElementById('download-btn');
  const enviarButtonContain = document.getElementById('enviar-btn-contain');
  const downloadButtonContain = document.getElementById('download-btn-contain');
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
    toalhaProduto: document.getElementById('checkout-produto-toalha'),
    toalhaForma: document.getElementById('checkout-forma-toalha'),
    toalhaBainha: document.getElementById('checkout-bainha-toalha'),
    toalhaLargura: document.getElementById('checkout-largura-toalha'),
    toalhaAltura: document.getElementById('checkout-altura-toalha'),
    toalhaMargem: document.getElementById('checkout-margem-toalha'),
  };

  // Send Email Form
  const feedbackMessage = document.getElementById('feedback-div');
  const feedbackSuccess = document.getElementById('feedback-success');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const checkFieldError = document.getElementById('contacto-switch-error');

  // ----------------------------
  //    FS CMS FILTER ELEMENTS
  // ----------------------------
  const cortinaRadioBtn = document.getElementById('cortina-radio-btn');
  const estoreRadioBtn = document.getElementById('estore-radio-btn');
  const calhaRadioBtn = document.getElementById('calha-radio-btn');
  const varaoRadioBtn = document.getElementById('varao-radio-btn');
  const toalhaRadioBtn = document.getElementById('toalha-radio-btn');
  // const primaryClearBtn = document.getElementById('primary-clear-btn');
  // const secondaryClearBtn = document.getElementById('secondary-clear-btn');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const clearAllBtnTxt = document.getElementById('clear-all-txt');



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
    addOnClickToFormaCards();
    addOnClickToBainhaCards();
    addOnClickBainha();
    addOnClickCorrecao();
    addOnClickInstalacao();
    addOnClickColor();
    addOnClickEnviar();
    addOnClickDownloadBtn();
    addOnClickNewWindow();
    addOnClickNoWindow();
    addOnClickCheckoutChoices();
    addOnClickStep();
    addOnChangeMedidasInputs();
    addOnChangeSuporteRadioBtns();
    addOnChangeFormInputs();
  };

  const onInit = () => {
    fetchProducts();
    initializeEventListeners();
    validateInputs();
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

    if (window2.inicio === 'Cortina' || window2.inicio === 'Estore Japonês' || window2.inicio === 'Toalha') {
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

    if (window2.inicio === 'Toalha') {
      return { product: productPrice, calha: 0 };
    }

    if (window2.inicio === 'Estore') {
      return { product: productPrice, calha: 0 };
    }

    if (window2.inicio === 'Estore Japonês') {
      const calhaReference = getCalhaReferenceForEstoreJapones(width);
      const calhaPrice = !productsData[calhaReference]
        ? 0
        : typeof productsData[calhaReference].price === 'string'
          ? parseFloat(productsData[calhaReference].price)
          : productsData[calhaReference].price;
      return { product: productPrice, calha: calhaPrice };
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
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRnpR16s-LlJCttzFQBqDmgLYSIGtTKbBKbDGUXfvjwGHR2W3u66qn4TV8DkHr2280Oru6V4QVgFYJV/pub?output=csv'
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
      updateSelectorValue(selectors.inicio, window.inicio);
      updateSelectorValue(selectors.tecido, window.tecido);
      updateSelectorValue(selectors.tipo, window.tipo);
      updateSelectorValue(selectors.bainha, window.bainha);
      updateSelectorValue(selectors.medidas, window.medidas);
      updateSelectorValue(selectors.correcao, window.correcao);
      // updateSelectorValue(selectors.calha, window.calha);
      updateSelectorValue(selectors.suporte, window.suporte);
      updateSelectorValue(selectors.instalacao, window.instalacao);
    }

    if (window.inicio.startsWith('Estore')) {
      updateSelectorValue(selectors.inicio, window.inicio);
      updateSelectorValue(selectors.tecido, window.tecido);
      updateSelectorValue(selectors.medidas, window.medidas);
      updateSelectorValue(selectors.correcao, window.correcao);
      updateSelectorValue(selectors.instalacao, window.instalacao);
    }
  };

  const updateValues = () => {
    if (!isNewWindow) {
      windows[currentWindowIndex].inicio = selectorValues.inicio;
      windows[currentWindowIndex].bainha = selectorValues.bainha;
      windows[currentWindowIndex].tecido = selectorValues.tecido;
      windows[currentWindowIndex].tipo = selectorValues.tipo;
      windows[currentWindowIndex].medidas = selectorValues.medidas;
      windows[currentWindowIndex].correcao = selectorValues.correcao;
      windows[currentWindowIndex].calha = selectorValues.calha;
      windows[currentWindowIndex].suporte = selectorValues.suporte;
      windows[currentWindowIndex].instalacao = selectorValues.instalacao;
    }
  };

  const storeValues = () => {
    const newWindow = {
      index: windows.length,
      inicio: selectorValues.inicio,
      bainha: selectorValues.bainha,
      forma: selectorValues.forma,
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
    resetSteps();
    currentWindowIndex = windows.length;
    navigateFromCheckoutToStep('inicio');
    isNewWindow = true;
  };

  const validateSelector = () => {
    switch (currentStep) {
      case 'inicio':
        if (selectorValues.inicio === '') {
          activateNextBtn(false);
          return false;
        }
        activateNextBtn(true);
        return true;
      case 'tecido':
        if (selectorValues.tecido === '') {
          activateNextBtn(false);
          return false;
        }
        activateNextBtn(true);
        return true;
      case 'tipo':
        if (selectorValues.tipo === '') {
          activateNextBtn(false);
          return false;
        }
        activateNextBtn(true);
        return true;
      case 'forma':
        if (selectorValues.forma === '') {
          activateNextBtn(false);
          return false;
        }
        activateNextBtn(true);
        return true;
      case 'medidas':
        if (selectorValues.inicio === 'Toalha') {
          if ((parseInt(larguraInput?.value) + (parseInt(margemInput?.value))) > MANUFACTURING_CONSTANTS.maxWidthToalhas) {
            margemMaxError.style.display = 'block';
            activateNextBtn(false);
            return false;
          }
          if ((parseInt(larguraInput?.value) + (parseInt(margemInput?.value))) < MANUFACTURING_CONSTANTS.minWidthToalhas) {
            margemMinError.style.display = 'block';
            activateNextBtn(false);
            return false;
          }

        }
        // if (larguraInput?.value === '' || alturaInput?.value === '') {
        //   activateNextBtn(false);
        //   return false;
        // }
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
          larguraMaxErrorCortina.style.display = 'none';
          alturaMaxErrorCortina.style.display = 'none';
          larguraMinErrorEstore.style.display = 'none';
          alturaMinErrorEstore.style.display = 'none';
          larguraMaxErrorEstore.style.display = 'none';
          alturaMaxErrorEstore.style.display = 'none';
          activateNextBtn(true);
          return true;
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
            larguraMinErrorEstore.style.display = 'none';
            alturaMinErrorEstore.style.display = 'none';
            parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidthEstores
              ? (larguraMaxErrorEstore.style.display = 'block')
              : (larguraMaxErrorEstore.style.display = 'none');
            parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeightEstores
              ? (alturaMaxErrorEstore.style.display = 'block')
              : (alturaMaxErrorEstore.style.display = 'none');
            activateNextBtn(false);
            return false; // Error Maximum value exceeded
          }
          larguraMaxErrorCortina.style.display = 'none';
          alturaMaxErrorCortina.style.display = 'none';
          larguraMinErrorEstore.style.display = 'none';
          alturaMinErrorEstore.style.display = 'none';
          larguraMaxErrorEstore.style.display = 'none';
          alturaMaxErrorEstore.style.display = 'none';
          activateNextBtn(true);
          return true;
        }
        if (selectorValues.inicio === 'Estore Japonês') {
          if (
            parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidthEstores ||
            parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeightEstores
          ) {
            larguraMinErrorEstore.style.display = 'none';
            alturaMinErrorEstore.style.display = 'none';
            parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidthEstores
              ? (larguraMaxErrorEstore.style.display = 'block')
              : (larguraMaxErrorEstore.style.display = 'none');
            parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeightEstores
              ? (alturaMaxErrorEstore.style.display = 'block')
              : (alturaMaxErrorEstore.style.display = 'none');
            activateNextBtn(false);
            return false; // Error Maximum value exceeded
          }
          larguraMaxErrorCortina.style.display = 'none';
          alturaMaxErrorCortina.style.display = 'none';
          larguraMinErrorEstore.style.display = 'none';
          alturaMinErrorEstore.style.display = 'none';
          larguraMaxErrorEstore.style.display = 'none';
          alturaMaxErrorEstore.style.display = 'none';
          activateNextBtn(true);
          return true;
        }
        larguraMaxErrorCortina.style.display = 'none';
        alturaMaxErrorCortina.style.display = 'none';
        larguraMinErrorEstore.style.display = 'none';
        alturaMinErrorEstore.style.display = 'none';
        larguraMaxErrorEstore.style.display = 'none';
        alturaMaxErrorEstore.style.display = 'none';
        margemMaxError.style.display = 'none';
        margemMinError.style.display = 'none';
        activateNextBtn(true);
        return true;
      case 'calha':
        if (selectorValues.calha === '') {
          activateNextBtn(false);
          return false;
        }
        activateNextBtn(true);
        return true;
      case 'suporte':
        if (selectorValues.suporte === '') {
          activateNextBtn(false);
          return false;
        }
        activateNextBtn(true);
        return true;
    }
    activateNextBtn(true);
    return true;
  };

  // UTILS
  // -----

  const getVariableEstoreReference = (product, color, width, height) => {
    const closestWidth = productSizes.estores.width.find((w) => w >= width);
    const closestHeight = productSizes.estores.height.find((h) => h >= height);
    return `${product}${closestHeight}${closestWidth}`;
  };

  const getCalhaReferenceForEstoreJapones = (width) => {
    const closestWidth = productSizes.estoresJaponeses.width.find((w) => w >= width);
    return `ROMANETE${closestWidth}`;
  };

  const getVariableCalhaReference = (product, type, color, width, isWallMounted) => {
    if (type === 'Ilhós') {
      const closestWidth2 = productSizes.calhas[`${product}-${color}`]?.find((w) => w >= width);
      return `${product}${closestWidth2}${color}`;
    }
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
    if (productType === 'Toalha') {
      // primaryClearBtn?.click();
      // secondaryClearBtn?.click();
      clearAllBtnTxt?.click();
      setTimeout(() => {
        toalhaRadioBtn?.click();
      }, 300);
    }
    if (productType === 'Estore') {
      // primaryClearBtn?.click();
      // secondaryClearBtn?.click();
      clearAllBtnTxt?.click();
      setTimeout(() => {
        estoreRadioBtn?.click();
      }, 300);
      // estoreRadioBtn?.click();
    }
    if (productType === 'Cortina' || productType === 'Estore Japonês') {
      // primaryClearBtn?.click();
      // secondaryClearBtn?.click();
      clearAllBtnTxt?.click();
      setTimeout(() => {
        cortinaRadioBtn?.click();
      }, 300);
      // cortinaRadioBtn?.click();
    }
    if (productType === 'Calha') {
      // primaryClearBtn?.click();
      // secondaryClearBtn?.click();
      clearAllBtnTxt?.click();
      setTimeout(() => {
        calhaRadioBtn?.click();
      }, 300);
      // calhaRadioBtn?.click();
    }
    if (productType === 'Varão') {
      // primaryClearBtn?.click();
      // secondaryClearBtn?.click();
      clearAllBtnTxt?.click();
      setTimeout(() => {
        varaoRadioBtn?.click();
      }, 300);
      // varaoRadioBtn?.click();
    }
    // fsCMSFilterConfig();
  };
  const fsCMSFilterConfig = () => {
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      'cmsfilter',
      (filterInstances) => {
        console.log('cmsfilter Successfully loaded!');

        // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
        const [filterInstance] = filterInstances;

        // The `renderitems` event runs whenever the list renders items after filtering.
        filterInstance.listInstance.on('renderitems', (renderedItems) => {
          console.log(renderedItems);
        });
      },
    ]);
  }
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
      if (getProductFromCard(card).split('-')[0].startsWith(value.split('-')[0])) {
        activateCard(card);
      } else {
        deactivateCard(card);
      }
    });
  };

  const selectTipo = (value) => {
    const tipoCards = document.querySelectorAll("[id^='tipo-card']");
    tipoCards.forEach((card) => {
      if (card.getElementsByTagName('h1')[0].textContent === value) {
        activateCard(card);
      } else {
        deactivateCard(card);
      }
    });
  };

  const selectSuporte = (value) => {
    if (value === 'Parede') {
      paredeRadioBtn.click();
    } else {
      tectoRadioBtn.click();
    }
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
        clonedBtn.querySelector('.checkout_info_title').textContent = `Janela ${windows.length}`;
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
    if (window.inicio.startsWith('Estore')) {
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
      simulatorHeadings.step1c.style.display = 'none';
      simulatorHeadings.step1e.style.display = 'flex';
    }
    if (step === 'tipo') {
      simulatorHeadings.step2t.style.display = 'flex';
      simulatorHeadings.step2b.style.display = 'none';
    }
    if (step === 'bainha' && selectorValues.inicio === 'Cortina') {
      simulatorHeadings.step2t.style.display = 'none';
      simulatorHeadings.step2b.style.display = 'flex';
    }
    if (step === 'forma') {
      simulatorHeadings.step2bt.style.display = 'none';
      simulatorHeadings.step2f.style.display = 'flex';
    }
    if (step === 'bainha' && selectorValues.inicio === 'Toalha') {
      simulatorHeadings.step2bt.style.display = 'flex';
      simulatorHeadings.step2f.style.display = 'none';
    }
    if (step === 'medidas') {
      simulatorHeadings.step3m.style.display = 'flex';
      simulatorHeadings.step3c.style.display = 'none';
    }
    if (step === 'correcao') {
      simulatorHeadings.step3m.style.display = 'none';
      simulatorHeadings.step3c.style.display = 'flex';
    }
    if (step === 'calha') {
      simulatorHeadings.step4c.style.display = 'flex';
      simulatorHeadings.step4s.style.display = 'none';
    }
    if (step === 'suporte') {
      simulatorHeadings.step4c.style.display = 'none';
      simulatorHeadings.step4s.style.display = 'flex';
    }
    if (step === 'instalacao') {
      simulatorHeadings.step5.style.display = 'flex';
    }
  };

  const navigateToStep = (step) => {
    if (step === 'largura' || step === 'altura') {
      step = 'medidas';
    }
    if (step === currentStep) {
      return;
    }

    let isEstore = false;

    if (
      step === 'estoreLargura' ||
      step === 'estoreAltura' ||
      step === 'estoreCorrecao' ||
      step === 'estoreInstalacao' ||
      step === 'estoreProduto' ||
      step === 'medidasEstore' ||
      selectorValues.inicio === 'Estore'
    ) {
      isEstore = true;
    }

    if (
      step === 'largura' ||
      step === 'altura' ||
      step === 'estoreLargura' ||
      step === 'estoreAltura' ||
      step === 'medidasEstore'
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
          selectorValues.inicio === 'Estore Japonês'
            ? updateProductsCMSFilter('Cortina')
            : isEstore
              ? updateProductsCMSFilter('Estore')
              : updateProductsCMSFilter('Cortina');
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
          selectorValues.tipo === 'Ilhós'
            ? updateProductsCMSFilter('Varão')
            : updateProductsCMSFilter('Calha');
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.tecido, true);
          break;
        case 'instalacao':
          changeSelectorVisibility(simulatorHeadings.step5, true);
          changeSelectorVisibility(selectors.instalacao, true);
          break;
      }
      currentStep = step;
      validateSelector();
      markStepAsActive(step);
    }
  };

  const updateMedidasFieldsVisibility = () => {
    if (selectorValues.inicio === 'Toalha') {
      if (selectorValues.forma === 'Quadrada' || selectorValues.forma === 'Redonda') {
        if (larguraContain) larguraContain.style.display = 'flex';
        if (alturaContain) alturaContain.style.display = 'none';
      } else {
        if (larguraContain) larguraContain.style.display = 'flex';
        if (alturaContain) alturaContain.style.display = 'flex';
      }
      if (margemContain) margemContain.style.display = 'flex';
    } else {
      if (larguraContain) larguraContain.style.display = 'flex';
      if (alturaContain) alturaContain.style.display = 'flex';
      if (margemContain) margemContain.style.display = 'none';
    }
  };

  const updateMedidasDescriptions = () => {
    if (selectorValues.inicio === 'Cortina') {
      larguraInputDescrC.style.display = 'block';
      alturaInputDescrC.style.display = 'block';
      larguraInputDescrE.style.display = 'none';
      alturaInputDescrE.style.display = 'none';
    }
    if (selectorValues.inicio === 'Estore' || selectorValues.inicio === 'Estore Japonês') {
      larguraInputDescrC.style.display = 'none';
      alturaInputDescrC.style.display = 'none';
      larguraInputDescrE.style.display = 'block';
      alturaInputDescrE.style.display = 'block';
    }
    if (
      selectorValues.inicio === 'Toalha' &&
      (selectorValues.forma === 'Quadrada' || selectorValues.forma === 'Redonda')
    ) {
      larguraInputDescrC.style.display = 'none';
      alturaInputDescrC.style.display = 'none';
      larguraInputDescrE.style.display = 'block';
      alturaInputDescrE.style.display = 'none';
    } else if (selectorValues.inicio === 'Toalha') {
      larguraInputDescrC.style.display = 'none';
      alturaInputDescrC.style.display = 'none';
      larguraInputDescrE.style.display = 'block';
      alturaInputDescrE.style.display = 'block';
    }
  };

  const advanceStep = () => {
    // scrollToTop();
    if (selectorValues.inicio === 'Cortina') {
      switch (currentStep) {
        case 'inicio':
          if (validateSelector()) {
            updateProductsCMSFilter(selectorValues.inicio);
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
            updateHeadingSubtitles('tipo');
            changeSelectorVisibility(simulatorHeadings.step2, true);
            changeSelectorVisibility(selectors.tipo, true);
            updateMedidasDescriptions();
            updateMedidasFieldsVisibility();
            currentStep = 'tipo';
          }
          break;
        case 'tipo':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.tipo, false);
            if (selectorValues.tecido.startsWith('9')) {
              updateSelectorValue(selectors.bainha, true);
              if (isNewWindow) activateNextBtn(false);
              markStepAsCompleted('tipo');
              markStepAsActive('medidas');
              changeSelectorVisibility(simulatorHeadings.step2, false);
              updateHeadingSubtitles('medidas');
              changeSelectorVisibility(simulatorHeadings.step3, true);
              changeSelectorVisibility(selectors.medidas, true);
              currentStep = 'medidas';
            } else {
              updateHeadingSubtitles('bainha');
              changeSelectorVisibility(selectors.bainha, true);
              currentStep = 'bainha';
            }
          }
          break;
        case 'bainha':
          updateSelectorValue(
            selectors.bainha,
            `${selectorValues.tecido.startsWith('9') ? true : selectorValues.bainha ? selectorValues.bainha : false}`
          );
          markStepAsCompleted('tipo');
          markStepAsActive('medidas');
          changeSelectorVisibility(simulatorHeadings.step2, false);
          changeSelectorVisibility(selectors.bainha, false);
          if (isNewWindow) activateNextBtn(false);
          updateHeadingSubtitles('medidas');
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
              selectorValues.tipo === 'Ilhós'
                ? updateProductsCMSFilter('Varão')
                : updateProductsCMSFilter('Calha');
              markStepAsCompleted('medidas');
              markStepAsActive('calha');
              changeSelectorVisibility(simulatorHeadings.step3, false);
              updateHeadingSubtitles('calha');
              changeSelectorVisibility(simulatorHeadings.step4, true);
              changeSelectorVisibility(selectors.tecido, true);
              currentStep = 'calha';
            } else {
              updateHeadingSubtitles('correcao');
              changeSelectorVisibility(selectors.correcao, true);
              currentStep = 'correcao';
            }
          }
          break;
        case 'correcao':
          selectorValues.tipo === 'Ilhós'
            ? updateProductsCMSFilter('Varão')
            : updateProductsCMSFilter('Calha');
          markStepAsCompleted('medidas');
          markStepAsActive('calha');
          changeSelectorVisibility(simulatorHeadings.step3, false);
          changeSelectorVisibility(selectors.correcao, false);
          if (isNewWindow) activateNextBtn(false);
          updateHeadingSubtitles('calha');
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.tecido, true);
          currentStep = 'calha';
          break;
        case 'calha':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.tecido, false);
            if (selectorValues.tipo === 'Ilhós') {
              activateNextBtn(true);
              changeSelectorVisibility(simulatorHeadings.step4, false);
              updateHeadingSubtitles('instalacao');
              changeSelectorVisibility(simulatorHeadings.step5, true);
              changeSelectorVisibility(selectors.instalacao, true);
              currentStep = 'instalacao';
            } else {
              if (isNewWindow) activateNextBtn(false);
              clearSuporteRadioBtns();
              updateHeadingSubtitles('suporte');
              changeSelectorVisibility(selectors.suporte, true);
              currentStep = 'suporte';
            }
          }
          break;
        case 'suporte':
          updateSelectorValue(selectors.suporte, paredeRadioBtn?.checked ? 'Parede' : 'Tecto');
          if (validateSelector()) {
            markStepAsCompleted('calha');
            markStepAsActive('instalacao');
            changeSelectorVisibility(simulatorHeadings.step4, false);
            changeSelectorVisibility(selectors.suporte, false);
            updateHeadingSubtitles('instalacao');
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
    } else if (selectorValues.inicio === 'Toalha') {
      switch (currentStep) {
        case 'inicio':
          if (validateSelector()) {
            toggleSteps('Toalha');
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
            markStepAsActive('forma');
            changeSelectorVisibility(simulatorHeadings.step1, false);
            if (isNewWindow) activateNextBtn(false);
            changeSelectorVisibility(selectors.tecido, false);
            updateHeadingSubtitles('forma');
            changeSelectorVisibility(simulatorHeadings.step2toalha, true);
            changeSelectorVisibility(selectors.forma, true);
            currentStep = 'forma';
          }
          break;
        case 'forma':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.forma, false);
            updateMedidasDescriptions();
            updateMedidasFieldsVisibility();
            if (isNewWindow) activateNextBtn(false);
            if (selectorValues.forma === "Redonda") {
              selectorValues.bainha = "Baínha Normal";
              markStepAsCompleted('forma');
              markStepAsActive('medidas');
              changeSelectorVisibility(simulatorHeadings.step2toalha, false);
              changeSelectorVisibility(simulatorHeadings.step3, true);
              changeSelectorVisibility(selectors.medidas, true);
              updateHeadingSubtitles('medidas');
              currentStep = 'medidas';
            } else {
              changeSelectorVisibility(selectors.bainha, true);
              currentStep = 'bainha';
            }
          }
          break;
        case 'bainha':
          // updateSelectorValue(
          //   selectors.bainha,
          //   `${selectorValues.bainha ? selectorValues.bainha : false}`
          // );
          markStepAsCompleted('forma');
          markStepAsActive('medidas');
          changeSelectorVisibility(simulatorHeadings.step2toalha, false);
          changeSelectorVisibility(selectors.bainha, false);
          if (isNewWindow) activateNextBtn(false);
          updateHeadingSubtitles('medidas');
          changeSelectorVisibility(simulatorHeadings.step3, true);
          changeSelectorVisibility(selectors.medidas, true);
          currentStep = 'medidas';
          break;
        case 'medidas':
          if (validateSelector()) {
            selectorValues.inicio === 'Toalha' &&
              (selectorValues.forma === 'Quadrada' || selectorValues.forma === 'Redonda')
              ? updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${larguraInput?.value} X ${margemInput?.value}`)
              : updateSelectorValue(
                selectors.medidas,
                `${larguraInput?.value} X ${alturaInput?.value} X ${margemInput?.value}`
              );
            changeSelectorVisibility(selectors.medidas, false);
            changeSelectorVisibility(simulatorHeadings.step3, false);
            markStepAsCompleted('medidasToalha');
            // markStepAsActive('instalacaoToalha');
            // changeSelectorVisibility(simulatorHeadings.step5, true);
            // changeSelectorVisibility(selectors.instalacao, true);
            // currentStep = 'instalacaoToalha';
            if (isNewWindow) {
              storeValues();
              createWindowBtnCheckout();
            }
            navigateToCheckout();
            // if (windows.length > 0) {
            //   if (isNewWindow) activateNextBtn(false);
            //   selectorValues.tipo === 'Ilh\xF3s'
            //     ? updateProductsCMSFilter('Var\xE3o')
            //     : updateProductsCMSFilter('Calha');
            //   markStepAsCompleted('medidas');
            //   markStepAsActive('calha');
            //   changeSelectorVisibility(simulatorHeadings.step3, false);
            //   changeSelectorVisibility(simulatorHeadings.step3, false);
            //   updateHeadingSubtitles('calha');
            //   changeSelectorVisibility(simulatorHeadings.step4, true);
            //   changeSelectorVisibility(selectors.tecido, true);
            //   currentStep = 'calha';
            // } else {
            //   updateHeadingSubtitles('correcao');
            //   changeSelectorVisibility(selectors.correcao, true);
            //   currentStep = 'correcao';
            // }

            // if (isNewWindow) {
            //   storeValues();
            //   createWindowBtnCheckout();
            // }
            // navigateToCheckout();
          }
          break;
        case 'correcao':
          selectorValues.tipo === 'Ilh\xF3s'
            ? updateProductsCMSFilter('Var\xE3o')
            : updateProductsCMSFilter('Calha');
          markStepAsCompleted('medidas');
          markStepAsActive('calha');
          changeSelectorVisibility(simulatorHeadings.step3, false);
          changeSelectorVisibility(selectors.correcao, false);
          if (isNewWindow) activateNextBtn(false);
          updateHeadingSubtitles('calha');
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.tecido, true);
          currentStep = 'calha';
          break;
        case 'calha':
          if (validateSelector()) {
            changeSelectorVisibility(selectors.tecido, false);
            if (selectorValues.tipo === 'Ilh\xF3s') {
              activateNextBtn(true);
              changeSelectorVisibility(simulatorHeadings.step4, false);
              updateHeadingSubtitles('instalacao');
              changeSelectorVisibility(simulatorHeadings.step5, true);
              changeSelectorVisibility(selectors.instalacao, true);
              currentStep = 'instalacao';
            } else {
              if (isNewWindow) activateNextBtn(false);
              clearSuporteRadioBtns();
              updateHeadingSubtitles('suporte');
              changeSelectorVisibility(selectors.suporte, true);
              currentStep = 'suporte';
            }
          }
          break;
        case 'suporte':
          updateSelectorValue(selectors.suporte, paredeRadioBtn?.checked ? 'Parede' : 'Tecto');
          if (validateSelector()) {
            markStepAsCompleted('calha');
            markStepAsActive('instalacao');
            changeSelectorVisibility(simulatorHeadings.step4, false);
            changeSelectorVisibility(selectors.suporte, false);
            updateHeadingSubtitles('instalacao');
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
            updateHeadingSubtitles('tecido');
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
            updateMedidasDescriptions();
            updateMedidasFieldsVisibility();
            if (isNewWindow) activateNextBtn(false);
            updateHeadingSubtitles('medidas');
            changeSelectorVisibility(simulatorHeadings.step3, true);
            changeSelectorVisibility(selectors.medidas, true);
            currentStep = 'medidas';
          }
          break;
        case 'medidas':
          if (validateSelector()) {
            // updateSelectorValue(
            //   selectors.medidas,
            //   `${larguraInput?.value} X ${alturaInput?.value}`
            // );
            changeSelectorVisibility(selectors.medidas, false);
            if (windows.length > 0) {
              markStepAsCompleted('medidas');
              markStepAsActive('instalacao');
              changeSelectorVisibility(simulatorHeadings.step3, false);
              updateHeadingSubtitles('instalacao');
              changeSelectorVisibility(simulatorHeadings.step5, true);
              changeSelectorVisibility(selectors.instalacao, true);
              currentStep = 'instalacao';
            } else {
              updateHeadingSubtitles('correcao');
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
    if (!isNewWindow) updateValues();
    simContainer.style.display = 'none';
    selectWindow(windows[windows.length - 1]);
    toggleSteps("");
    checkoutContain.style.display = 'flex';
  };

  // CHECKOUT FUNCTIONS
  // ------------------

  const populateCheckoutChoices = (window2) => {
    if (window2.inicio === 'Cortina') {
      checkoutInfoCortina.style.display = 'flex';
      checkoutInfoEstore.style.display = 'none';
      checkoutInfoToalha.style.display = 'none';
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

    if (window2.inicio.startsWith('Estore')) {
      checkoutInfoEstore.style.display = 'flex';
      checkoutInfoCortina.style.display = 'none';
      checkoutInfoToalha.style.display = 'none';
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

    if (window2.inicio === 'Toalha') {
      checkoutInfoToalha.style.display = 'flex';
      checkoutInfoCortina.style.display = 'none';
      checkoutInfoEstore.style.display = 'none';
      checkoutChoices.toalhaProduto.textContent = window2.tecido;
      checkoutChoices.toalhaForma.textContent = window2.forma;
      checkoutChoices.toalhaBainha.textContent = window2.bainha
      checkoutChoices.toalhaLargura.textContent = window2.medidas.split(' X ')[0] + 'cm';
      checkoutChoices.toalhaAltura.textContent = window2.medidas.split(' X ')[1] + 'cm';
      checkoutChoices.toalhaMargem.textContent = window2.medidas.split(' X ')[2] + 'cm';
    }
  };

  const populateSteps = (window2) => {
    if (window2.inicio === 'Cortina') {
      markStepAsCompleted('tecido');
      markStepAsCompleted('tipo');
      markStepAsCompleted('medidas');
      markStepAsCompleted('calha');
      markStepAsCompleted('instalacao');
    }
    if (window2.inicio.startsWith('Estore')) {
      markStepAsCompleted('tecido');
      markStepAsCompleted('medidas');
      markStepAsCompleted('instalacao');
    }
  };

  const selectWindow = (window2) => {
    windows.forEach((w) => {
      if (w.button) {
        w.button.classList.remove('active');
      }
    });
    currentWindowIndex = window2.index;
    isNewWindow = false;
    window2.button.classList.add('active');
    populateCheckoutChoices(window2);
    populateSelectorValues(window2);
    populateInputValues(window2);
    populateSteps(window2);
  };

  const navigateFromCheckoutToStep = (step) => {
    checkoutContain.style.display = 'none';
    if (isNewWindow) resetSteps();
    toggleSteps("");
    simContainer.style.display = 'flex';

    let isEstore = false;
    let isToalha = false;

    if (
      step === 'estoreLargura' ||
      step === 'estoreAltura' ||
      step === 'estoreCorrecao' ||
      step === 'estoreInstalacao' ||
      step === 'estoreProduto' ||
      selectorValues.inicio === 'Estore'
    ) {
      isEstore = true;
    }

    if (selectorValues.inicio === 'Toalha') {
      isToalha = true;
    }

    if (
      step === 'largura' ||
      step === 'altura' ||
      step === 'estoreLargura' ||
      step === 'estoreAltura'
    ) {
      step = 'medidas';
    }

    if (step === 'estoreCorrecao' || step === 'correcao') {
      step = 'medidas';
    }

    if (step === 'estoreInstalacao' || step === 'instalacao') {
      step = 'instalacao';
    }

    if (step === 'estoreProduto') {
      step = 'tecido';
    }

    isEstore ? toggleSteps('Estore') : isToalha ? toggleSteps("Toalha") : toggleSteps('Cortina');

    switch (step) {
      case 'inicio':
        updateHeadingSubtitles('inicio');
        changeSelectorVisibility(simulatorHeadings.step1, true);
        changeSelectorVisibility(selectors.inicio, true);
        break;
      case 'tecido':
        selectorValues.inicio === 'Estore Japonês'
          ? updateProductsCMSFilter('Cortina')
          : isEstore
            ? updateProductsCMSFilter('Estore')
            : updateProductsCMSFilter('Cortina');
        setTimeout(() => { }, 2000);
        selectProduct(selectorValues.tecido);
        updateHeadingSubtitles('tecido');
        changeSelectorVisibility(simulatorHeadings.step1, true);
        changeSelectorVisibility(selectors.tecido, true);
        break;
      case 'tipo':
        updateHeadingSubtitles('tipo');
        changeSelectorVisibility(simulatorHeadings.step2, true);
        changeSelectorVisibility(selectors.tipo, true);
        break;
      case 'toalhaProduto':
        updateProductsCMSFilter('Toalha'); // TODO: Change to Toalha filter
        updateHeadingSubtitles('tecido');
        changeSelectorVisibility(simulatorHeadings.step1, true);
        changeSelectorVisibility(selectors.tecido, true);
        break;
      case 'toalhaForma':
        updateHeadingSubtitles('forma');
        changeSelectorVisibility(simulatorHeadings.step2toalha, true);
        changeSelectorVisibility(selectors.forma, true);
        break;
      case 'toalhaMedidas':
        updateHeadingSubtitles('medidas');
        changeSelectorVisibility(simulatorHeadings.step3, true);
        changeSelectorVisibility(selectors.medidas, true);
        break;
      case 'medidas':
        updateHeadingSubtitles('medidas');
        changeSelectorVisibility(simulatorHeadings.step3, true);
        changeSelectorVisibility(selectors.medidas, true);
        break;
      case 'calha':
        selectorValues.tipo === 'Ilhós'
          ? updateProductsCMSFilter('Varão')
          : updateProductsCMSFilter('Calha');
        updateHeadingSubtitles('calha');
        changeSelectorVisibility(simulatorHeadings.step4, true);
        changeSelectorVisibility(selectors.tecido, true);
        break;
      case 'suporte':
        updateHeadingSubtitles('suporte');
        changeSelectorVisibility(simulatorHeadings.step4, true);
        changeSelectorVisibility(selectors.suporte, true);
        break;
      case 'instalacao':
        updateHeadingSubtitles('instalacao');
        changeSelectorVisibility(simulatorHeadings.step5, true);
        changeSelectorVisibility(selectors.instalacao, true);
        break;
    }

    currentStep = step;

    if (currentStep === 'inicio') {
      return markStepAsActive('tecido');
    }
    if (currentStep === 'toalhaProduto') {
      currentStep = 'tecido';
    }

    if (isEstore) {
      if (step === 'medidas' || step === 'correcao') {
        markStepAsActive('medidasEstore');
      }
      if (step === 'instalacao') {
        markStepAsActive('instalacaoEstore');
      }
    }

    isNewWindow = false;
    markStepAsActive(step);
    // markStepAsActive(step);
  };

  const compressPdf = async (base64Pdf) => {
    const pdfBytes = Buffer.from(base64Pdf, 'base64');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const compressedPdfBytes = await pdfDoc.save();
    return Buffer.from(compressedPdfBytes).toString('base64');
  };

  const fetchImage = async (url) => {
    const response = await fetch(url);
    const imageBytes = await response.arrayBuffer();
    return imageBytes;
  };

  const writePdfFooters = (footerY, lineHeight, rightMargin, rgb, x, pdfDoc, fontReg) => {
    const totalPages = pdfDoc.getPageCount();
    const footerText = 'www.fabricstore.pt';
    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
      const currentPageNumber = pages.indexOf(page) + 1;
      const paginationText = `Pag. ${currentPageNumber} de ${totalPages}`;
      const paginationWidth = fontReg.widthOfTextAtSize(paginationText, 8);
      const paginationCenterX = (page.getWidth() - paginationWidth) / 2;
      page.drawLine({
        start: { x: x, y: footerY - 4 * lineHeight },
        end: { x: rightMargin, y: footerY - 4 * lineHeight },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      page.drawText(footerText, { x: x, y: footerY - 5 * lineHeight, size: 10, fontReg });
      page.drawText(paginationText, {
        x: paginationCenterX,
        y: footerY - 5 * lineHeight,
        size: 8,
        fontReg,
      });
    });
  };

  const generateAndDownloadPdfLIB = async () => {
    const { PDFDocument, rgb } = PDFLib;
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595.28, 841.89]); // A4 page size (in points)
    let y = 800; // Start at the top
    const x = 50; // Left margin
    const rightMargin = 520; // Right margin
    const lineHeight = 12;
    const lineSpacing = 3;
    let total = 0;
    const footerY = 100;

    const fontReg = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);

    const clientY = y;

    let logoTest = null;
    try {
      logoTest = await loadImageFromWebflow(logoUrl);
      const pngImageBytes = await fetch(logoTest).then((res) => res.arrayBuffer());
      const pngImage = await pdfDoc.embedPng(pngImageBytes);

      const { width: originalWidth, height: originalHeight } = pngImage.scale(1);
      const logoWidth = 100;
      const logoHeight = (originalHeight / originalWidth) * logoWidth; // Maintain aspect ratio dynamically
      const logoX = (page.getWidth() - logoWidth) / 2; // Center the logo horizontally

      page.drawImage(pngImage, {
        x: logoX,
        y: clientY - 10, // Align with text (slight offset to adjust for font size)
        width: logoWidth,
        height: logoHeight,
      });
    } catch (error) {
      console.error('Error loading logo:', error);
    }

    const labelCliente = 'Cliente:';
    const labelData = 'Data:';
    const labelEmail = 'Email:';

    const dateString = new Date().toLocaleDateString();

    // Calculate the width of the bold labels
    const labelClienteWidth = fontBold.widthOfTextAtSize(labelCliente, 8);
    const labelDataWidth = fontBold.widthOfTextAtSize(labelData, 8);
    const labelEmailWidth = fontBold.widthOfTextAtSize(labelEmail, 8);

    // Calculate the width of the date string in the regular font
    const dateStringWidth = fontReg.widthOfTextAtSize(dateString, 8);

    // Draw "Cliente:"
    page.drawText(labelCliente, {
      x,
      y: clientY,
      size: 8,
      font: fontBold,
    });

    // Draw the cliente name right after "Cliente:"
    page.drawText(`${selectorValues.nome}`, {
      x: x + labelClienteWidth + 2, // Adjust X based on the width of "Cliente:"
      y: clientY,
      size: 8,
      font: fontReg, // Regular font for the value
    });

    // Total width of the text "Data: 00/00/0000"
    const totalTextWidth = labelDataWidth + dateStringWidth + 2; // Adding a small space between "Data:" and date

    // Adjust the X position based on the total width
    const textX = rightMargin - totalTextWidth;

    // Draw "Data:" label in bold
    page.drawText(labelData, {
      x: textX,
      y: clientY,
      size: 8,
      font: fontBold, // Bold font for the label
    });

    // Draw the date right after "Data:"
    page.drawText(dateString, {
      x: textX + labelDataWidth + 2, // Add a small space after "Data:"
      y: clientY,
      size: 8,
      font: fontReg,
    });

    const emailY = clientY - lineHeight;

    // Draw "Email:"
    page.drawText(labelEmail, {
      x,
      y: emailY,
      size: 8,
      font: fontBold,
    });

    page.drawText(`${selectorValues.email}`, {
      x: x + labelEmailWidth + 2, // Adjust X based on the width of "Email:"
      y: emailY,
      size: 8,
      font: fontReg,
    });

    y = emailY - lineHeight * 2; // Adjust after client info and logo to continue with the rest of the document

    y -= lineSpacing; // Add space above the line
    page.drawLine({
      start: { x: x, y: y },
      end: { x: rightMargin, y: y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
    });
    y -= lineSpacing + lineHeight; // Add space below the line and account for text

    page.drawText('Descrição', { x: x, y, size: 8, font: fontBold });
    page.drawText('Preço', { x: rightMargin - 100, y, size: 8, font: fontBold });
    y -= lineHeight - 4;

    y -= lineSpacing;
    page.drawLine({
      start: { x: x, y: y },
      end: { x: rightMargin, y: y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
    });
    y -= lineSpacing + lineHeight;

    windows.forEach(async (window2, index) => {
      if (
        (y < 264 + footerY && window2.inicio === 'Cortina') ||
        (y < 102 + footerY && window2.inicio.startsWith('Estore'))
      ) {
        // Add new page when reaching the end
        const newPage = pdfDoc.addPage([595.28, 841.89]);
        page = newPage;
        y = 800;

        y = emailY - lineHeight * 2; // Adjust after client info and logo to continue with the rest of the document

        y -= lineSpacing; // Add space above the line
        page.drawLine({
          start: { x: x, y: y },
          end: { x: rightMargin, y: y },
          thickness: 0.5,
          color: rgb(0, 0, 0),
        });
        y -= lineSpacing + lineHeight; // Add space below the line and account for text

        page.drawText('Descrição', { x: x, y, size: 8, font: fontBold });
        page.drawText('Preço', { x: rightMargin - 100, y, size: 8, font: fontBold });
        y -= lineHeight - 4;

        y -= lineSpacing;
        page.drawLine({
          start: { x: x, y: y },
          end: { x: rightMargin, y: y },
          thickness: 0.5,
          color: rgb(0, 0, 0),
        });
        y -= lineSpacing + lineHeight;
      }

      const {
        usedWidth,
        tecido,
        calha,
        instalacao,
        total: windowTotal
      } = calculateWindowPrice(window2);

      total += windowTotal;

      // // Draw Window Description
      // page.drawText(`Janela ${index + 1} -`, { x, y, size: 8, font: fontBold });

      // // Draw the rest of the text in regular font
      // page.drawText(` ${window2.medidas} CM`, {
      //   x: x + fontBold.widthOfTextAtSize(`Janela ${index + 1} -`, 8),
      //   y,
      //   size: 8,
      //   font: fontReg,
      // });
      // y -= lineHeight;

      let items = [];

      if (window2.inicio === 'Toalha') {
        // Draw Window Description
        page.drawText(`Toalha ${index + 1} -`, { x, y, size: 8, font: fontBold });

        // Draw the rest of the text in regular font
        page.drawText(` ${window2.medidas} CM`, {
          x: x + fontBold.widthOfTextAtSize(`Janela ${index + 1} -`, 8),
          y,
          size: 8,
          font: fontReg,
        });
        y -= lineHeight;
        // Create priced items with their respective subitems
        items = [
          {
            label: `Toalha`,
            price: tecido,
            subItems: [
              { label: `Tipo de tecido: ${window2.tecido}` },
              { label: `Forna da toalha: ${window2.tipo}` },
              {
                label: `Baínha: ${window2.bainha}`,
              },
            ],
          },
        ];
      }
      if (window2.inicio === 'Cortina') {
        // Draw Window Description
        page.drawText(`Janela ${index + 1} -`, { x, y, size: 8, font: fontBold });

        // Draw the rest of the text in regular font
        page.drawText(` ${window2.medidas} CM`, {
          x: x + fontBold.widthOfTextAtSize(`Janela ${index + 1} -`, 8),
          y,
          size: 8,
          font: fontReg,
        });
        y -= lineHeight;
        // Create priced items with their respective subitems
        items = [
          {
            label: `Cortinado`,
            price: tecido,
            subItems: [
              { label: `Tipo de tecido: ${window2.tecido}` },
              { label: `Modelo de cortina: ${window2.tipo}` },
              {
                label: `Baínha de chumbo: ${window2.tecido.startsWith('9') ? 'Incluída' : window2.bainha ? 'Sim' : 'Não'
                  }`,
              },
            ],
          },
          {
            label: `${window2.tipo === 'Ilhós' ? 'Varão' : 'Calha'}`,
            price: calha,
            subItems: [
              {
                label: `${window2.tipo === 'Ilhós' ? 'Modelo de varão' : 'Modelo de calha'}: ${window2.calha}`,
              },
              {
                label: `${window2.tipo === 'Ilhós' ? 'Suporte de varão' : 'Suporte da calha'}: ${window2.tipo === 'Ilhós' ? 'Parede' : window2.suporte}`,
              },
            ],
          },
          {
            label: `Instalação`,
            price: instalacao,
            subItems: [],
          },
        ];
      }
      if (window2.inicio === 'Estore') {
        // Draw Window Description
        page.drawText(`Janela ${index + 1} -`, { x, y, size: 8, font: fontBold });

        // Draw the rest of the text in regular font
        page.drawText(` ${window2.medidas} CM`, {
          x: x + fontBold.widthOfTextAtSize(`Janela ${index + 1} -`, 8),
          y,
          size: 8,
          font: fontReg,
        });
        y -= lineHeight;
        // Create priced items with their respective subitems
        items = [
          {
            label: `Estore`,
            price: tecido,
            subItems: [{ label: `Modelo de estore: ${window2.tecido}` }],
          },
          {
            label: `Instalação`,
            price: instalacao,
            subItems: [],
          },
        ];
      }

      if (window2.inicio === 'Estore Japonês') {
        // Draw Window Description
        page.drawText(`Janela ${index + 1} -`, { x, y, size: 8, font: fontBold });

        // Draw the rest of the text in regular font
        page.drawText(` ${window2.medidas} CM`, {
          x: x + fontBold.widthOfTextAtSize(`Janela ${index + 1} -`, 8),
          y,
          size: 8,
          font: fontReg,
        });
        y -= lineHeight;
        // Create priced items with their respective subitems
        items = [
          {
            label: `Estore Japonês`,
            price: tecido + calha,
            subItems: [{ label: `Modelo de estore: ${window2.tecido}` }],
          },
          {
            label: `Instalação`,
            price: instalacao,
            subItems: [],
          },
        ];
      }

      items.forEach((item) => {
        // Draw the main item label in bold
        page.drawText(`  - ${item.label}`, { x, y, size: 8, font: fontBold });
        page.drawText(`${item.price.toFixed(2)}€`, { x: rightMargin - 100, y, size: 8, fontReg });
        y -= lineHeight;

        // Draw each subitem, indented, and in regular font
        item.subItems.forEach((subItem) => {
          page.drawText(`      • ${subItem.label}`, { x: x + 20, y, size: 8, font: fontReg });
          y -= lineHeight;
        });

        y -= lineHeight; // Extra space after each main item
      });

      // Draw Total for the window
      page.drawText(`Total`, { x, y, size: 8, font: fontBold });
      page.drawText(`${windowTotal.toFixed(2)}€`, { x: rightMargin - 100, y, size: 10, fontReg });
      y -= lineHeight;

      // Draw horizontal line after each window total
      y -= lineSpacing;
      page.drawLine({
        start: { x: x, y: y },
        end: { x: rightMargin, y: y },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      y -= lineSpacing + lineHeight;
    });

    if (y < 38 + footerY) {
      // Add new page when reaching the end
      const newPage = pdfDoc.addPage([595.28, 841.89]);
      page = newPage;
      y = 800;
      y = emailY - lineHeight * 2; // Adjust after client info and logo to continue with the rest of the document
      y -= lineSpacing; // Add space above the line
      page.drawLine({
        start: { x: x, y: y },
        end: { x: rightMargin, y: y },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      y -= lineSpacing + lineHeight; // Add space below the line and account for text
      page.drawText('Descrição', { x: x, y, size: 8, font: fontBold });
      page.drawText('Preço', { x: rightMargin - 100, y, size: 8, font: fontBold });
      y -= lineHeight - 4;
      y -= lineSpacing;
      page.drawLine({
        start: { x: x, y: y },
        end: { x: rightMargin, y: y },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      y -= lineSpacing + lineHeight;
    }

    // Draw Correction
    const correctionLabel = !windows[0].correcao ? 'Facultadas pelo cliente' : 'Sim';
    page.drawText('Retificação de medidas:', { x, y, size: 8, font: fontBold });
    page.drawText(correctionLabel, {
      x: x + fontBold.widthOfTextAtSize('Retificação de medidas:', 8) + 2,
      y,
      size: 8,
      font: fontReg,
    });
    const correctionPrice = windows[0].correcao ? 30 : 0;
    total += correctionPrice;
    page.drawText(`${correctionPrice.toFixed(2)}€`, { x: rightMargin - 100, y, size: 8, fontReg });
    y -= lineHeight - 4;

    // Draw horizontal line
    y -= lineSpacing;
    page.drawLine({
      start: { x: x, y: y },
      end: { x: rightMargin, y: y },
      thickness: 0.5,
      color: rgb(0, 0, 0),
    });
    y -= lineSpacing + lineHeight * 2;

    if (y < 38 + footerY) {
      // Add new page when reaching the end
      const newPage = pdfDoc.addPage([595.28, 841.89]);
      page = newPage;
      y = 800;
      y = emailY - lineHeight * 2; // Adjust after client info and logo to continue with the rest of the document
      y -= lineSpacing; // Add space above the line
      page.drawLine({
        start: { x: x, y: y },
        end: { x: rightMargin, y: y },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      y -= lineSpacing + lineHeight; // Add space below the line and account for text
      page.drawText('Descrição', { x: x, y, size: 8, font: fontBold });
      page.drawText('Preço', { x: rightMargin - 100, y, size: 8, font: fontBold });
      y -= lineHeight - 4;
      y -= lineSpacing;
      page.drawLine({
        start: { x: x, y: y },
        end: { x: rightMargin, y: y },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      y -= lineSpacing + lineHeight;
    }

    // Draw Total
    page.drawText('Total:', { x: rightMargin - 150, y, size: 10, font: fontBold });
    page.drawText(`${total.toFixed(2)}€`, { x: rightMargin - 100, y, size: 10, fontBold });

    if (y < 108 + footerY) {
      // Add new page when reaching the end
      const newPage = pdfDoc.addPage([595.28, 841.89]);
      page = newPage;
      y = 800;
      y = emailY - lineHeight * 2; // Adjust after client info and logo to continue with the rest of the document
      y -= lineSpacing; // Add space above the line
      page.drawLine({
        start: { x: x, y: y },
        end: { x: rightMargin, y: y },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      y -= lineSpacing + lineHeight; // Add space below the line and account for text
      page.drawText('Descrição', { x: x, y, size: 8, font: fontBold });
      page.drawText('Preço', { x: rightMargin - 100, y, size: 8, font: fontBold });
      y -= lineHeight - 4;
      y -= lineSpacing;
      page.drawLine({
        start: { x: x, y: y },
        end: { x: rightMargin, y: y },
        thickness: 0.5,
        color: rgb(0, 0, 0),
      });
      y -= lineSpacing + lineHeight;
    }

    //Observações
    y -= lineHeight * 4;
    page.drawText('Observações:', {
      x: x,
      y: y,
      size: 10,
      font: fontBold,
    });
    const bulletPoint = '• ';
    const bulletIndent = 10;

    page.drawText(
      `${bulletPoint}Valores com IVA incluido à taxa em vigor. Orçamento válido por 15 dias.`,
      {
        x: x + bulletIndent,
        y: y - lineHeight,
        size: 8,
        font: fontReg,
      }
    );
    page.drawText(
      `${bulletPoint}Calhas já incluem os rodízios e suportes necessários para as medidas selecionadas.`,
      { x: x + bulletIndent, y: y - 2 * lineHeight, size: 8, font: fontReg }
    );
    page.drawText(
      `${bulletPoint}Valor referente à instalação e rectificação de medidas sujeito a validação do código postal.`,
      { x: x + bulletIndent, y: y - 3 * lineHeight, size: 8, font: fontReg }
    );
    page.drawText(
      `${bulletPoint}Valor da Rectificação de Medidas é deduzido do orçamento na adjudicação do mesmo.`,
      { x: x + bulletIndent, y: y - 4 * lineHeight, size: 8, font: fontReg }
    );
    page.drawText(`${bulletPoint}IBAN: PT50 0007 0000 0041 4543 3722 3`, {
      x: x + bulletIndent,
      y: y - 5 * lineHeight,
      size: 8,
      font: fontReg,
    });

    writePdfFooters(footerY, lineHeight, rightMargin, rgb, x, pdfDoc, fontReg);

    // Save the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Orcamento_Fabric-Store.pdf';
    // link.click();
    return { blob: blob, pdfDoc: pdfDoc, link: link };
  };

  const generateTxt = async () => {
    let total = 0;
    let txtContent = '';
    txtContent += `Data: ${new Date().toLocaleDateString()}\n\n`;
    txtContent += `Cliente: ${selectorValues.nome}\n\n`;
    txtContent += `Email: ${selectorValues.email}\n\n`;
    const correctionLabel = !windows[0].correcao ? '  Facultadas pelo cliente:' : '  Sim:';
    const correctionPrice = windows[0].correcao ? 30 : 0;
    windows.forEach((window2, index) => {
      const {
        usedWidth,
        tecido,
        calha,
        instalacao,
        total: windowTotal,
      } = calculateWindowPrice(window2);
      total += windowTotal;
      if (window2.inicio === 'Cortina') {
        txtContent += `Janela ${index + 1} - ${window2.medidas} CM: ${windowTotal.toFixed(2)}€\n\n`;
        txtContent += `  Cortinado: ${tecido.toFixed(2)}€\n`;
        txtContent += `    Tipo de tecido: ${window2.tecido}\n`;
        txtContent += `    Modelo de Cortina: ${window2.tipo}\n`;
        txtContent += `    Baínha de chumbo: ${window2.tecido.startsWith('9') ? 'Incluída' : window2.bainha ? 'Sim' : 'Não'
          }\n\n`;
        txtContent += `  Calha: ${calha.toFixed(2)}€\n`;
        txtContent += `    Modelo de calha: ${window2.tipo}\n`;
        txtContent += `    Suporte da calha: ${window2.suporte}\n\n`;
      }
      if (window2.inicio === 'Estore') {
        txtContent += `Janela ${index + 1} - ${window2.medidas} CM: ${windowTotal.toFixed(2)}€\n\n`;
        txtContent += `  Estore: ${tecido.toFixed(2)}€\n`;
        txtContent += `    Modelo de estore: ${window2.tecido}\n\n`;
      }
      if (window2.inicio === 'Estore Japonês') {
        txtContent += `Janela ${index + 1} - ${window2.medidas} CM: ${windowTotal.toFixed(2)}€\n\n`;
        txtContent += `  Estore: ${parseFloat(tecido.toFixed(2)) + parseFloat(calha.toFixed(2))}€\n`;
        txtContent += `    Modelo de estore: ${window2.tecido}\n\n`;
      }
      if (window2.inicio === 'Toalha') {
        txtContent += `Toalha ${index + 1} - ${window2.medidas} CM: ${windowTotal.toFixed(2)}€\n\n`;
        txtContent += `  Toalha: ${tecido.toFixed(2)}€\n`;
        txtContent += `    Tecido: ${window2.tecido}\n`;
        txtContent += `    Forma: ${window2.forma}\n`;
        txtContent += `    Largura: ${window2.medidas.split(' X ')[0]}cm\n`;
        txtContent += `    Altura: ${window2.medidas.split(' X ')[1]}cm\n`;
        txtContent += `    Margem: ${window2.medidas.split(' X ')[2]}cm\n`;
      }
      txtContent += `  Instalação: ${instalacao.toFixed(2)}€\n\n`;
    });
    // Add correction and total
    txtContent += `Retificação de medidas:\n${correctionLabel} ${correctionPrice.toFixed(2)}€\n\n`;
    total += correctionPrice;
    // Add final total
    txtContent += `Total: ${total.toFixed(2)}€\n\n`;
    // Create and download the txt file
    const txtBlob = new Blob([txtContent], { type: 'text/plain' });
    // const txtLink = document.createElement('a');
    // txtLink.href = URL.createObjectURL(txtBlob);
    // txtLink.download = 'Orcamento_Fabric-Store.txt';
    // txtLink.click();
    return txtBlob;
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

  const toggleSteps = (productType) => {
    if (!productType) {
      cortinaSteps.style.display = 'none';
      estoreSteps.style.display = 'none';
      toalhaSteps.style.display = 'none';
    }
    if (productType === 'Cortina') {
      cortinaSteps.style.display = 'flex';
      estoreSteps.style.display = 'none';
      toalhaSteps.style.display = 'none';
    }
    if (productType === 'Estore') {
      cortinaSteps.style.display = 'none';
      estoreSteps.style.display = 'flex';
      toalhaSteps.style.display = 'none';
    }
    if (productType === 'Toalha') {
      cortinaSteps.style.display = 'none';
      estoreSteps.style.display = 'none';
      toalhaSteps.style.display = 'flex';
    }
  };

  const scrollToTop = () => {
    gsap.registerPlugin(ScrollToPlugin);

    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: 'power2.inOut' });
  };

  const changeSelectorVisibility = (selector, visible) => {
    // selector.style.display = visible ? 'flex' : 'none';
    // if (visible) {
    //   gsap.fromTo(
    //     selector,
    //     { opacity: 0, display: 'none' },
    //     { opacity: 1, display: 'flex', duration: 0.8, delay: 0.5 }
    //   );
    // } else {
    //   gsap.to(selector, { opacity: 0, display: 'none', duration: 0.4 });
    // }
    if (visible) {
      gsap.fromTo(
        selector,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.inOut', // Added Power2 ease
          onStart: () => {
            selector.style.display = 'flex'; // Set display to flex before animation starts
          },
        }
      );
    } else {
      gsap.to(selector, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut', // Added Power2 ease
        onComplete: () => {
          selector.style.display = 'none'; // Set display to none after animation ends
          scrollToTop();
        },
      });
    }
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
    if (step === 'medidasToalha') {
      steps.medidasToalha?.classList.remove('active');
      steps.medidasToalha?.classList.remove('next');
      steps.medidasToalha?.classList.add('done');
      steps.medidasToalha?.getElementsByClassName('step_number')[0].classList.remove('active');
      selectorValues.forma === "Redonda" || selectorValues.forma === "Quadrada" ? steps.medidasToalha.getElementsByClassName('step_description')[0].textContent =
        `${larguraInput?.value} X ${larguraInput?.value} X ${margemInput?.value} cm` : steps.medidasToalha.getElementsByClassName('step_description')[0].textContent =
      `${larguraInput?.value} X ${alturaInput?.value} X ${margemInput?.value} cm`;
    }
    if (step === 'tipo') {
      steps[step].getElementsByClassName('step_description')[0].innerHTML += `${selectorValues.bainha ? '<br>c/Ba\xEDnha de Chumbo' : '<br>s/Ba\xEDnha de Chumbo'
        }`;
    }
  };

  const markStepAsActive = (targetStep) => {

    const step = targetStep === "toalhaProduto" ? "tecido" : targetStep;
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

  const markStepAsNext = (stepToMark) => {
    let step = stepToMark;

    if (step === 'suporte') {
      step = 'calha';
    }

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

    if (!isNewWindow || validateSelector()) return markStepAsCompleted(step);

    steps[step].classList.add('next');
    if (
      steps[step].querySelector('step_description') &&
      !steps[step].querySelector('step_description')[0].classList.contains('next')
    ) {
      steps[step].querySelector('step_description')[0].classList.add('next');
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

  // GSAP ANIMATIONS
  // ---------------

  const animateOpacity = (element) => {
    // const element = document.getElementById(element);
    element.classList.add('show');
    gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power1.in' });
  };

  const animateSlideFromLeft = (element) => {
    // const element = document.getElementById(element);
    element.classList.add('show');
    gsap.fromTo(
      element,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power1.inOut' }
    );
  };

  const animateOpacityAndSlide = (elementIds, staggerTime = 0) => {
    gsap.fromTo(
      elementIds.map((id) => `#${id}`),
      { opacity: 0, x: -300 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power1.inOut',
        stagger: staggerTime,
      }
    );
  };

  const toggleBainhaForProduct = (productType) => {
    if (productType === 'Toalha') {
      bainhaCards.style.display = 'flex';
      bainhaForm.style.display = 'none';
    } else {
      bainhaCards.style.display = 'none';
      bainhaForm.style.display = 'block';
    }
  }
  // EVENT LISTENERS
  // ---------------
  const addOnClickToInicioCards = () => {
    const cards = document.querySelectorAll("[id^='inicio-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const productType = card.getElementsByTagName('h1')[0].textContent;
        activateCard(card);
        cards.forEach((cardFromList) => {
          if (cardFromList !== card) {
            deactivateCard(cardFromList);
          }
        });
        updateProductsCMSFilter(productType);
        toggleBainhaForProduct(productType);
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
          selectedDiv.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
            'tecido_image'
          )[0];
        for (let i = 0; i < colors.length; i++) {
          if (colors[i].getAttribute('id') === selectedColor) {
            const displayImg = colors[i].querySelector('.source');
            if (displayImg) {
              cardThumbnailImage.setAttribute('src', displayImg.getAttribute('src'));
            } else {
              cardThumbnailImage.setAttribute(
                'src',
                colors[i].getElementsByTagName('img')[0].getAttribute('src')
              );
            }
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

  const addOnClickToFormaCards = () => {
    const cards = document.querySelectorAll("[id^='forma-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        activateCard(card);
        cards.forEach((cardFromList) => {
          if (cardFromList !== card) {
            deactivateCard(cardFromList);
          }
        });
        updateSelectorValue(selectors.forma, card.getElementsByTagName('h1')[0].textContent);
        if (validateSelector()) activateNextBtn(true);
      });
    });
  };

  const addOnClickToBainhaCards = () => {
    const cards = document.querySelectorAll("[id^='bainha-card']");
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        activateCard(card);
        cards.forEach((cardFromList) => {
          if (cardFromList !== card) {
            deactivateCard(cardFromList);
          }
        });
        updateSelectorValue(selectors.bainha, card.getElementsByTagName('h1')[0].textContent);
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
    margemInput?.addEventListener('input', (event) => {
      if (selectorValues.inicio === 'Toalha') {
        if ((selectorValues.forma === 'Quadrada' || selectorValues.forma === 'Redonda')) {
          if (larguraInput?.value === '' || margemInput?.value === '') {
            activateNextBtn(false);
            return;
          }
        } else {
          if (larguraInput?.value === '' || alturaInput?.value === '' || margemInput?.value === '') {
            activateNextBtn(false);
            return;
          }
        }
      } else {
        if (larguraInput?.value === '' || alturaInput?.value === '') {
          activateNextBtn(false);
          return;
        }
      }
      validateSelector() &&
        updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
      }
    });

    larguraInput?.addEventListener('input', (event) => {
      if (selectorValues.inicio === 'Toalha') {
        if ((selectorValues.forma === 'Quadrada' || selectorValues.forma === 'Redonda')) {
          if (larguraInput?.value === '' || margemInput?.value === '') {
            activateNextBtn(false);
            return;
          }
        } else {
          if (larguraInput?.value === '' || alturaInput?.value === '' || margemInput?.value === '') {
            activateNextBtn(false);
            return;
          }
        }
      } else {
        if (larguraInput?.value === '' || alturaInput?.value === '') {
          activateNextBtn(false);
          return;
        }
      }
      validateSelector() &&
        updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
      if (!(larguraInput?.value === '') && !(alturaInput?.value === '')) {
        validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
      }
    });

    alturaInput?.addEventListener('input', (event) => {
      if (selectorValues.inicio === 'Toalha') {
        if (larguraInput?.value === '' || alturaInput?.value === '' || margemInput?.value === '') {
          activateNextBtn(false);
          return;
        }
      } else {
        if (larguraInput?.value === '' || alturaInput?.value === '') {
          activateNextBtn(false);
          return;
        }
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
        if (key === 'suporte') {
          return;
          // return navigateFromCheckoutToStep('calha');
        }
        if (key === 'bainha') {
          return;
          // return navigateFromCheckoutToStep('tipo');
        }
        // if (key === 'estoreInstalacao') {
        //   return navigateFromCheckoutToStep('instalacaoEstore');
        // }
        // if (key === 'estoreLargura' || key === 'estoreAltura') {
        //   return navigateFromCheckoutToStep('medidasEstore');
        // }
        // if (key === 'estoreCorrecao') {
        //   return navigateFromCheckoutToStep('correcao');
        // }
        // if (key === 'estoreProduto') {
        //   return navigateFromCheckoutToStep('estoreProduto');
        // }
        navigateFromCheckoutToStep(key);
      });
    });
  };

  const addOnClickToWindowBtn = (window2) => {
    window2.button.addEventListener('click', () => {
      selectWindow(window2);
    });
  };

  const addOnClickDownloadBtn = () => {
    downloadButton.addEventListener('click', async () => {
      selectorValues.nome = nomeInput.value;
      selectorValues.email = emailInput.value;
      selectorValues.contacto = contactoSwitch.checked;
      const txtBytes = await generateTxt();
      sendQuoteDataWhenDownload(txtBytes);
      const { blob, pdfDoc, link } = await generateAndDownloadPdfLIB();
      files.push({ blob: blob, pdf: pdfDoc, link: link });
      files[files.length - 1].link.click();
    });
  };

  const addOnClickEnviar = () => {
    enviarButton.addEventListener('click', async () => {
      selectorValues.nome = nomeInput.value;
      selectorValues.email = emailInput.value;
      selectorValues.contacto = contactoSwitch.checked;
      const { blob, pdfDoc, link } = await generateAndDownloadPdfLIB(); // base64 -> data:application/pdf;base64,JVBERi0xLjMKJbrfrOAKM   to remove metadata pdfbytes.split(',')[1]
      files.push({ blob: blob, pdf: pdfDoc, link: link });
      const txtBytes = await generateTxt();
      await sendQuoteEmail(
        selectorValues.nome,
        selectorValues.email,
        selectorValues.contacto ? 'Aceita' : 'Não aceita',
        files[files.length - 1].blob,
        txtBytes,
        files[files.length - 1].link
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
    if (window2.inicio === 'Toalha') {
      const medidasValues = window2.medidas.split(' X ');
      const [width, height, margin] = medidasValues.map((value) => parseInt(value));
      //check which one is the biggest
      const biggest = Math.max(width, height);
      const smallest = Math.min(width, height);
      const bainha = window2.bainha.includes('Cantos') ? MANUFACTURING_CONSTANTS.bainhaToalhas.cantos.widthMargin : MANUFACTURING_CONSTANTS.bainhaToalhas.normal.widthMargin

      if (biggest + (2 * margin) + bainha <= MANUFACTURING_CONSTANTS.maxWidthToalhas) {
        return smallest + (2 * margin) + bainha;
      } else {
        return biggest + (2 * margin) + bainha;
      }

      return parseInt(window2.medidas.split(' X ')[0]);
      // return parseInt(window2.medidas.split(' X ')[0]);
    }
    if (window2.inicio === 'Estore Japonês') {
      const width = window2.medidas ? parseInt(window2.medidas.split(' X ')[0]) : 0;
      return width;
    }
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
    if (window2.inicio === 'Toalha') {
      productPrice = prices.product * (usedWidth / 100);
    }
    if (window2.inicio === 'Cortina') {
      productPrice = prices.product * (usedWidth / 100);
      calhaPrice = prices.calha;
    }
    if (window2.inicio === 'Estore') {
      productPrice = prices.product;
    }
    if (window2.inicio === 'Estore Japonês') {
      productPrice =
        prices.product *
        ((usedWidth + MANUFACTURING_CONSTANTS.bainhaEstoreJaponesPrice.widthMargin) / 100);
      calhaPrice = prices.calha;
    }
    return { product: productPrice, calha: calhaPrice };
  };

  const calculateManufacturingPrice = (window2, usedWidth) => {

    if (window2.inicio === 'Toalha') {

      const shape = window2.forma === "Redonda" ? "circle" : window2.forma === "Quadrada" ? "square" : "retangle";
      const bainha = window2.bainha.includes('Cantos') ? "cantos" : "normal";

      const prices = MANUFACTURING_CONSTANTS.manufacturingPrices.towels[shape][bainha];
      // TODO: if smallest > 170 go into the next price.

      const manufacturingPrice = prices.find((priceDetails) => usedWidth <= priceDetails.maxWidth);

      const medidasValues = window2.medidas.split(' X ');
      const [width, height, margin] = medidasValues.map((value) => parseInt(value));
      //check which one is the biggest
      const biggest = Math.max(width, height);
      const smallest = Math.min(width, height);
      const bainhaWidth = window2.bainha.includes('Cantos') ? MANUFACTURING_CONSTANTS.bainhaToalhas.cantos.widthMargin : MANUFACTURING_CONSTANTS.bainhaToalhas.normal.widthMargin

      if (smallest + (2 * margin) + bainhaWidth <= MANUFACTURING_CONSTANTS.maxWidthToalhasNoPriceIncrease) {
        return manufacturingPrice ? manufacturingPrice.price : 0;
      } else {
        const currentIndex = prices.findIndex((priceDetails) => usedWidth <= priceDetails.maxWidth);
        const nextManufacturingPrice = currentIndex + 1 < prices.length ? prices[currentIndex + 1] : prices[currentIndex];

        return nextManufacturingPrice ? nextManufacturingPrice.price : 0;
      }

      // return manufacturingPrice ? manufacturingPrice.price * (usedWidth / 100) : 0;
      return manufacturingPrice ? manufacturingPrice.price : 0;
    }

    if (window2.inicio === 'Estore') {
      return 0;
    }
    if (window2.inicio === 'Estore Japonês') {
      const width = window2.medidas.split(' X ')[0];
      const height = window2.medidas.split(' X ')[1];
      const area = (parseInt(width) / 100) * (parseInt(height) / 100);
      return area ? area * MANUFACTURING_CONSTANTS.manufacturingPrices.japaneseBlind : 0;
    }

    const manufacturingPrice = MANUFACTURING_CONSTANTS.manufacturingPrices.curtains.find(
      (price) => window2.tipo === price.name
    );
    if (manufacturingPrice) {
      // return window2.tecido.startsWith('101')
      return window2.tecido.startsWith('8') // Blackout
        ? manufacturingPrice.blackout * (usedWidth / 100)
        : // : (window2.tecido.startsWith('120') || window2.tecido.startsWith('122')) &&
        window2.tecido.startsWith('9') && // Alinhado
          (window2.tipo === 'Ondas' || window2.tipo === 'Franzido')
          ? manufacturingPrice.alinhado * (usedWidth / 100)
          : manufacturingPrice.normal * (usedWidth / 100);
    }
    return 0;
  };

  const calculateBainhaPrice = (window2, usedWidth) => {
    if (window2.inicio === 'Toalha') return 0;
    if (window2.inicio === 'Cortina' && window2.tecido.startsWith('9')) {
      return 0;
    }
    if (window2.inicio.startsWith('Estore')) {
      return 0;
    }
    if (window2.bainha) {
      return MANUFACTURING_CONSTANTS.bainhaPrice.price * (usedWidth / 100);
    }
    return 0;
  };

  const calculateMeasuresCheckPrice = (window2) => {
    if (window2.inicio === 'Toalha') return 0;
    return !window2.correcao ? 0 : MANUFACTURING_CONSTANTS.measuresCheckPrice;
  };

  const calculateInstalationPrice = (window2) => {
    if (window2.inicio === 'Toalha') return 0;
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
    // return {
    //   usedWidth: totalWidth,
    //   productPrice: materialPrice.product,
    //   manufacturingPrice,
    //   bainhaPrice,
    //   calhaPrice: materialPrice.calha,
    //   instalationPrice,
    //   windowTotal: result,
    // };
    return {
      usedWidth: totalWidth,
      tecido: materialPrice.product + manufacturingPrice + bainhaPrice,
      calha: materialPrice.calha,
      instalacao: instalationPrice,
      total: result,
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

  const validateNameInput = () => {
    if (nomeInput.value.trim() === '') {
      nameError.textContent = 'Preencher este campo obrigatório';
      nameError.classList.add('u-text-main');
      return true;
    }
    nameError.textContent = '';
    nameError.classList.remove('u-text-main');
    return false;
  };

  const validateEmailInput = () => {
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      emailError.textContent = 'Preencher este campo obrigatório';
      emailError.classList.add('u-text-main');
      return true;
    }
    if (!isValidEmail(emailValue)) {
      emailError.textContent = 'Insira um email válido';
      emailError.classList.add('u-text-main');
      return true;
    }
    emailError.textContent = '';
    emailError.classList.remove('u-text-main');
    return false;
  };

  const validateInputs = () => {
    resetCheckoutErrors(); // Clear previous error messages
    const nameErrorExists = validateNameInput();
    const emailErrorExists = validateEmailInput();
    activateEnviarBtn(nameErrorExists || emailErrorExists);
    activateDownloadBtn(nameErrorExists || emailErrorExists);
  };

  const addOnChangeFormInputs = () => {
    nomeInput?.addEventListener('input', validateInputs);
    emailInput?.addEventListener('input', validateInputs);
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

  const activateEnviarBtn = (isError) => {
    if (isError) {
      enviarButtonContain?.classList.add('inactive');
    }
    if (!isError) {
      enviarButtonContain?.classList.remove('inactive');
    }
  };

  const activateDownloadBtn = (isError) => {
    if (isError) {
      downloadButtonContain?.classList.add('inactive');
    }
    if (!isError) {
      downloadButtonContain?.classList.remove('inactive');
    }
  };

  const sendQuoteDataWhenDownload = async (base64TxtPromise) => {
    let txtFile = null;
    try {
      const base64Txt = await base64TxtPromise;
      txtFile = await blobToBase64(base64Txt);
    } catch {
      console.error('Failed to load txt');
      txtFile = null;
    }

    const templateParamsTxt = {
      name: selectorValues.nome,
      email: selectorValues.email,
      check: selectorValues.contacto ? 'Aceita' : 'Não aceita',
      file: txtFile,
      to_company_email: 'contact@fabricstore.pt',
      reply_to: 'contact@fabricstore.pt',
    };

    emailjs.send('service_fabricstore', 'template_quote_txt', templateParamsTxt).then(
      function (response) {
        console.log('TXT DL SUCCESS!', response.status, response.text);
        // userDetailsForm.style.display = 'none';
        // feedbackMessage.style.display = 'none';
        // feedbackSuccess.textContent = 'Obrigado pelo seu contacto!';
        // feedbackSuccess.style.display = 'block';
      },
      function (error) {
        console.log('TXT DL FAILED...', error);
        // feedbackSuccess.style.display = 'none';
        // feedbackMessage.textContent =
        //   'Aconteceu um erro durante o envio. Tente novamente ou entre em contacto connosco.';
        // feedbackMessage.style.display = 'block';
      }
    );
  };

  const sendQuoteEmail = async (
    name,
    email,
    allowsContact,
    base64PdfPromise,
    base64TxtPromise,
    downloadLink
  ) => {
    // const feedbackMessage = document.getElementById('feedback-div');
    let pdfFile = null;
    let txtFile = null;

    try {
      const base64Pdf = await base64PdfPromise;
      const base64Txt = await base64TxtPromise;
      pdfFile = await blobToBase64(base64Pdf);
      txtFile = await blobToBase64(base64Txt);
    } catch {
      console.error('Failed to load PDF');
      pdfFile = null;
    }
    const templateParamsPdf = {
      name: name,
      email: email,
      check: allowsContact,
      file: pdfFile,
      to_company_email: 'contact@fabricstore.pt', // The company's email
      to_user_email: email, // Send a copy to the user
      reply_to: 'contact@fabricstore.pt',
    };

    const templateParamsTxt = {
      name: name,
      email: email,
      check: allowsContact,
      file: txtFile,
      to_company_email: 'contact@fabricstore.pt',
      reply_to: 'contact@fabricstore.pt',
    };

    emailjs.send('service_fabricstore', 'template_quote_pdf', templateParamsPdf).then(
      function (response) {
        console.log('PDF EMAIL SUCCESS!', response.status, response.text);
        userDetailsForm.style.display = 'none';
        feedbackMessage.style.display = 'none';
        feedbackSuccess.textContent = 'Obrigado pelo seu contacto!';
        feedbackSuccess.style.display = 'block';
      },
      function (error) {
        console.log('PDF EMAIL FAILED...', error);
        feedbackSuccess.style.display = 'none';
        feedbackMessage.textContent =
          'Aconteceu um erro durante o envio. Tente novamente ou entre em contacto connosco.';
        feedbackMessage.style.display = 'block';
      }
    );

    emailjs.send('service_fabricstore', 'template_quote_txt', templateParamsTxt).then(
      function (response) {
        console.log('TXT SUCCESS!', response.status, response.text);
        // userDetailsForm.style.display = 'none';
        // feedbackMessage.style.display = 'none';
        // feedbackSuccess.textContent = 'Obrigado pelo seu contacto!';
        // feedbackSuccess.style.display = 'block';
      },
      function (error) {
        console.log('TXT FAILED...', error);
        // feedbackSuccess.style.display = 'none';
        // feedbackMessage.textContent =
        //   'Aconteceu um erro durante o envio. Tente novamente ou entre em contacto connosco.';
        // feedbackMessage.style.display = 'block';
      }
    );
  };

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
  
  onInit();
  // createRitaAbreuWindows();
});
