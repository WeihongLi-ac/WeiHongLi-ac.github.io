(() => {
    const navigation = document.querySelector('.site-nav');
    const toggle = navigation?.querySelector('.site-nav__toggle');
    const links = navigation?.querySelector('.site-nav__links');
    if (!toggle || !links) return;

    const mobile = window.matchMedia('(max-width: 768px)');
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    }

    function updateScrollState() {
        navigation.classList.toggle('is-scrolled', window.scrollY > 50);
    }

    toggle.addEventListener('click', () => setOpen(!isOpen()));
    navigation.addEventListener('click', event => {
        if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', event => {
        if (isOpen() && !navigation.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && isOpen()) {
            setOpen(false);
            toggle.focus();
        }
    });
    navigation.addEventListener('focusout', event => {
        if (isOpen() && event.relatedTarget && !navigation.contains(event.relatedTarget)) setOpen(false);
    });
    mobile.addEventListener('change', () => setOpen(false));
    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    navigation.dataset.enhanced = '';
    toggle.hidden = false;
})();
