"use client";
import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import './StaggeredMenu.css';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [] as any[],
  socialItems = [] as any[],
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  logoUrl = '',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: any) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const textWrapRef = useRef<HTMLSpanElement>(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const busyRef = useRef(false);
  const activeAnimationsRef = useRef<Animation[]>([]);

  const cancelAnimations = () => {
    activeAnimationsRef.current.forEach(a => {
      try { a.cancel(); } catch(e) {}
    });
    activeAnimationsRef.current = [];
  };

  useLayoutEffect(() => {
    const offscreen = position === 'left' ? '-100%' : '100%';
    if (panelRef.current) {
      panelRef.current.style.transform = `translateX(${offscreen})`;
      panelRef.current.style.opacity = '1';
    }
    if (preLayersRef.current) {
      Array.from(preLayersRef.current.children).forEach((el: any) => {
        el.style.transform = `translateX(${offscreen})`;
        el.style.opacity = '1';
      });
    }
    if (toggleBtnRef.current) toggleBtnRef.current.style.color = menuButtonColor;
    if (iconRef.current) iconRef.current.style.transform = 'rotate(0deg)';
    if (textInnerRef.current) textInnerRef.current.style.transform = 'translateY(0%)';
    if (plusVRef.current) plusVRef.current.style.transform = 'translate(-50%, -50%) rotate(90deg)';
  }, [menuButtonColor, position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    cancelAnimations();

    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    if (!panel) return;

    const offscreen = position === 'left' ? '-100%' : '100%';
    const layers = preContainer ? Array.from(preContainer.children) : [];
    
    let maxDelay = 0;
    
    layers.forEach((el: any, i) => {
      const delay = i * 70;
      const anim = el.animate(
        [{ transform: `translateX(${offscreen})` }, { transform: 'translateX(0%)' }],
        { duration: 500, delay, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
      );
      activeAnimationsRef.current.push(anim);
      maxDelay = Math.max(maxDelay, delay + 500);
    });

    const panelDelay = (layers.length - 1) * 70 + (layers.length ? 80 : 0);
    const panelAnim = panel.animate(
      [{ transform: `translateX(${offscreen})` }, { transform: 'translateX(0%)' }],
      { duration: 650, delay: panelDelay, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
    );
    activeAnimationsRef.current.push(panelAnim);
    maxDelay = Math.max(maxDelay, panelDelay + 650);

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
    
    const itemsStart = panelDelay + 650 * 0.15;
    
    itemEls.forEach(el => { el.style.transform = 'translateY(140%) rotate(10deg)'; });
    numberEls.forEach(el => { el.style.setProperty('--sm-num-opacity', '0'); });
    
    itemEls.forEach((el, i) => {
      const delay = itemsStart + i * 100;
      const anim = el.animate(
        [{ transform: 'translateY(140%) rotate(10deg)' }, { transform: 'translateY(0%) rotate(0deg)' }],
        { duration: 1000, delay, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
      );
      activeAnimationsRef.current.push(anim);
      maxDelay = Math.max(maxDelay, delay + 1000);
    });

    numberEls.forEach((el, i) => {
      const delay = itemsStart + 100 + i * 80;
      const anim = el.animate(
        [{ opacity: 0 }, { opacity: 1 }], 
        { duration: 600, delay, easing: 'ease-out', fill: 'forwards' }
      );
      activeAnimationsRef.current.push(anim);
    });

    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
    const socialsStart = panelDelay + 650 * 0.4;
    
    if (socialTitle) {
      socialTitle.style.opacity = '0';
      const anim = socialTitle.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: socialsStart, easing: 'ease-out', fill: 'forwards' });
      activeAnimationsRef.current.push(anim);
    }
    
    socialLinks.forEach((el, i) => {
      el.style.transform = 'translateY(25px)';
      el.style.opacity = '0';
      const delay = socialsStart + 40 + i * 80;
      const anim = el.animate(
        [{ transform: 'translateY(25px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
        { duration: 550, delay, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', fill: 'forwards' }
      );
      activeAnimationsRef.current.push(anim);
    });

    setTimeout(() => { busyRef.current = false; }, maxDelay);
  }, [position]);

  const playClose = useCallback(() => {
    cancelAnimations();
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    if (!panel) return;

    const offscreen = position === 'left' ? '-100%' : '100%';
    const layers = preContainer ? Array.from(preContainer.children) : [];
    
    const all = [...layers, panel] as HTMLElement[];
    
    all.forEach(el => {
      const anim = el.animate(
        [{ transform: 'translateX(0%)' }, { transform: `translateX(${offscreen})` }],
        { duration: 320, easing: 'cubic-bezier(0.5, 0, 0.1, 1)', fill: 'forwards' }
      );
      activeAnimationsRef.current.push(anim);
      anim.onfinish = () => { busyRef.current = false; };
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    if (!iconRef.current) return;
    const anim = iconRef.current.animate(
      opening ? [{ transform: 'rotate(0deg)' }, { transform: 'rotate(225deg)' }] : [{ transform: 'rotate(225deg)' }, { transform: 'rotate(0deg)' }],
      { duration: opening ? 800 : 350, easing: opening ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'ease-in-out', fill: 'forwards' }
    );
    activeAnimationsRef.current.push(anim);
  }, []);

  const animateColor = useCallback((opening: boolean) => {
    if (!toggleBtnRef.current || !changeMenuColorOnOpen) return;
    const targetColor = opening ? openMenuButtonColor : menuButtonColor;
    const anim = toggleBtnRef.current.animate(
      [{ color: toggleBtnRef.current.style.color || menuButtonColor }, { color: targetColor }],
      { duration: 300, delay: 180, easing: 'ease-out', fill: 'forwards' }
    );
    activeAnimationsRef.current.push(anim);
    toggleBtnRef.current.style.color = targetColor;
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    if (!textInnerRef.current) return;
    const seq = opening ? ['Menu', 'Close', 'Menu', 'Close', 'Menu', 'Close'] : ['Close', 'Menu', 'Close', 'Menu', 'Close', 'Menu'];
    setTextLines(seq);
    const lineCount = seq.length;
    const finalShift = -((lineCount - 1) / lineCount) * 100;
    
    const anim = textInnerRef.current.animate(
      [{ transform: 'translateY(0%)' }, { transform: `translateY(${finalShift}%)` }],
      { duration: 500 + lineCount * 70, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
    );
    activeAnimationsRef.current.push(anim);
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: any) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c: string, i: number) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo cursor-pointer group" aria-label="Logo" onClick={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.animate(
              [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
              { duration: 800, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' }
            );
          }
          window.dispatchEvent(new CustomEvent('open-modal', { detail: { type: 'settings' } }));
        }}>
          {logoUrl ? <img
            src={logoUrl}
            alt="Logo"
            className="sm-logo-img invert group-hover:opacity-80 transition-opacity"
            draggable={false}
            width={32}
            height={32}
          /> : <span className="font-mono font-bold text-arctic-powder text-xl tracking-wider">ARMORY</span>}
        </div>
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel bg-white text-black" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a className="sm-panel-item text-black" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title text-[#5227FF]">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link text-black">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
