function lazyload(): void {
    const lazyloadIframes: NodeListOf<HTMLIFrameElement> = document.querySelectorAll("iframe");

    const iframeObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
                const iframe = entry.target as HTMLIFrameElement;
                iframe.src = iframe.dataset.src || '';
                iframe.classList.remove("lazy");
                iframeObserver.unobserve(iframe);
            }
        });
    });

    lazyloadIframes.forEach((iframe: HTMLIFrameElement) => {
        iframeObserver.observe(iframe);
    });
}

if (typeof document !== 'undefined') {
    document.onreadystatechange = function (): void {
        if (document.readyState === "complete") {
            lazyload();
        }
    };
}
