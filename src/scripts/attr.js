/**
 * Look for specific attributes in dom and generate elements.
 */
function attrify(dom) {
    handleUrl(dom);
    handleNewpage(dom);
    handleImages(dom);
    handleTitle(dom);
    handleName(dom);
    handleCaption(dom);
    handleImgSize(dom);
}

/**
 * Allow title attribute on <p> and <section> tags to generate titles.
 * Note: title are changed to data-title to avoid browser interaction, but without hiding the attribute from developer
 * tools.
 */
function handleTitle(dom) {
    dom.find("*[title!=''][title]").each(function (index) {
        if ($(this).prop('tagName') === 'P') {
            $(this).prepend('<span class="para-title">' + $(this).attr('title') + '</span>');
        } else if ($(this).prop('tagName') === 'SECTION') {
            $(this).prepend('<h1 class="section-title">' + $(this).attr('title') + '</h1>');
        }
        
        // Remove title attr to avoid browser hover effect
        $(this).attr('data-title', $(this).attr('title'));
        $(this).removeAttr('title');
    });
}

/**
 * Handle name attribute on any tag for quick reference to any element.
 */
function handleName(dom) {
    dom.find("*[name!=''][name]").each(function (index) {
        if ($(this).prop('tagName') === 'IMG') { //Images can't have nested <a> tag
            $(this).before('<a name="' + $(this).attr('name') + '"></a>');
        } else {
            $(this).prepend('<a name="' + $(this).attr('name') + '"></a>');    
        }
    });
}

/**
 * Wrap all images in <figure> tag to allow for name and captions.
 */
function handleImages(dom) {
    dom.find("img").each(function (index) {
        if ($(this).parent().prop('tagName') !== 'FIGURE') {
            $(this).wrap('<figure>');
        }
    });
}

/**
 * Create <figcaption> under images if caption attribute is specified. 
 */
function handleCaption(dom) {
    dom.find("img[caption!=''][caption]").each(function (index) {
        $(this).after('<figcaption>' + $(this).attr('caption') + '</figcaption>');
    });
}

/**
 * Handle all unit types for width and hight attributes on images.
 * Note: width and height only support px and % without.
 */
function handleImgSize(dom) {
    dom.find("img[width!=''][width]").each(function (index) {
        $(this).css('width', $(this).attr('width'));
    });
    dom.find("img[height!=''][height]").each(function (index) {
        $(this).css('height', $(this).attr('height'));
    });
}

/**
 * Handle url attribute on 'a' tags, copy href to html and set target to blank.
 */
function handleUrl(dom) {
    dom.find('a[url=""]').each(function (index) {
        var elem = $(this),
            href = elem.attr('href');
        elem.html(href).attr('target', '_blank');
    });
}

/**
 * Handle newpage attribute on any element.
 */
function handleNewpage(dom) {
    dom.find('*[newpage=""]').each(function () {
        var elem = $(this);
        elem.before('<div class="tex-newpage"></div>');
    });
}
