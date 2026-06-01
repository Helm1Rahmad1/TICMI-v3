import { SVGProps } from 'react';

type IcoProps = SVGProps<SVGSVGElement> & {
  d?: React.ReactNode;
  size?: number;
  sw?: number;
};

export function Ico({ d, size = 16, fill = 'none', stroke = 'currentColor', sw = 1.6, ...rest }: IcoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size} height={size}
      viewBox="0 0 24 24"
      fill={fill} stroke={stroke}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      {...rest}
    >
      {typeof d === 'string' ? <path d={d} /> : d}
    </svg>
  );
}

type IcoProp = Omit<IcoProps, 'd'>;

export const I = {
  home:    (p: IcoProp = {}) => <Ico {...p} d="M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10z"/>,
  layers:  (p: IcoProp = {}) => <Ico {...p} d="M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 16l9 5 9-5"/>,
  file:    (p: IcoProp = {}) => <Ico {...p} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5zM14 3v5h5"/>,
  book:    (p: IcoProp = {}) => <Ico {...p} d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4zM18 20a3 3 0 0 0 3-3V7"/>,
  chart:   (p: IcoProp = {}) => <Ico {...p} d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
  grid:    (p: IcoProp = {}) => <Ico {...p} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>,
  users:   (p: IcoProp = {}) => <Ico {...p} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>,
  spark:   (p: IcoProp = {}) => <Ico {...p} d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>,
  cog:     (p: IcoProp = {}) => <Ico {...p} d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.2.6.8 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>,
  search:  (p: IcoProp = {}) => <Ico {...p} d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3"/>,
  bell:    (p: IcoProp = {}) => <Ico {...p} d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9zM10.3 21a1.94 1.94 0 0 0 3.4 0"/>,
  plus:    (p: IcoProp = {}) => <Ico {...p} d="M12 5v14M5 12h14"/>,
  arrow:   (p: IcoProp = {}) => <Ico {...p} d="M5 12h14M13 5l7 7-7 7"/>,
  upload:  (p: IcoProp = {}) => <Ico {...p} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>,
  brain:   (p: IcoProp = {}) => <Ico {...p} d="M9 3a3 3 0 0 0-3 3v.5A3 3 0 0 0 4 9a3 3 0 0 0 1 2.2A3 3 0 0 0 4 14a3 3 0 0 0 2 2.8V18a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM15 3a3 3 0 0 1 3 3v.5A3 3 0 0 1 20 9a3 3 0 0 1-1 2.2 3 3 0 0 1 1 2.8 3 3 0 0 1-2 2.8V18a3 3 0 0 1-6 0"/>,
  flame:   (p: IcoProp = {}) => <Ico {...p} d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 2.5-1 2.5-2.5 0-2-2-3-2-5 0 1-1.5 2-3 3.5S8.5 13 8.5 14.5zM12 2c.5 4 5 5 5 11a5 5 0 0 1-10 0c0-2 1-4 2-5"/>,
  zap:     (p: IcoProp = {}) => <Ico {...p} d="M13 2L3 14h7l-1 8 11-14h-7l1-6z"/>,
  check:   (p: IcoProp = {}) => <Ico {...p} d="M20 6L9 17l-5-5"/>,
  x:       (p: IcoProp = {}) => <Ico {...p} d="M18 6L6 18M6 6l12 12"/>,
  send:    (p: IcoProp = {}) => <Ico {...p} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>,
  mic:     (p: IcoProp = {}) => <Ico {...p} d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3M8 21h8"/>,
  paper:   (p: IcoProp = {}) => <Ico {...p} d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7L12 12l8.7-5M12 22V12"/>,
  graph:   (p: IcoProp = {}) => <Ico {...p} d="M3 3v18h18M7 14l3-3 4 4 6-7"/>,
  bolt:    (p: IcoProp = {}) => <Ico {...p} d="M11 3L4 14h6l-1 7 8-12h-6l1-6z"/>,
  bookmark:(p: IcoProp = {}) => <Ico {...p} d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>,
  clock:   (p: IcoProp = {}) => <Ico {...p} d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2"/>,
  pin:     (p: IcoProp = {}) => <Ico {...p} d="M12 22s8-8 8-13a8 8 0 1 0-16 0c0 5 8 13 8 13zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>,
  filter:  (p: IcoProp = {}) => <Ico {...p} d="M3 4h18l-7 9v6l-4 2v-8L3 4z"/>,
  download:(p: IcoProp = {}) => <Ico {...p} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>,
  copy:    (p: IcoProp = {}) => <Ico {...p} d="M8 4h10a2 2 0 0 1 2 2v12M16 8H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"/>,
  more:    (p: IcoProp = {}) => <Ico {...p} d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>,
  star:    (p: IcoProp = {}) => <Ico {...p} d="M12 2l3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1 3-7z"/>,
  target:  (p: IcoProp = {}) => <Ico {...p} d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>,
  trend:   (p: IcoProp = {}) => <Ico {...p} d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6"/>,
  cal:     (p: IcoProp = {}) => <Ico {...p} d="M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18"/>,
  device:  (p: IcoProp = {}) => <Ico {...p} d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2"/>,
  flow:    (p: IcoProp = {}) => <Ico {...p} d="M5 5h4v4H5zM15 5h4v4h-4zM10 15h4v4h-4zM9 7h6M7 9v6h5M17 9v6h-5"/>,
  globe:   (p: IcoProp = {}) => <Ico {...p} d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>,
  menu:    (p: IcoProp = {}) => <Ico {...p} d="M3 6h18M3 12h18M3 18h18"/>,
  open:    (p: IcoProp = {}) => <Ico {...p} d="M15 3h6v6M10 14L21 3M21 14v7H3V3h7"/>,
  pause:   (p: IcoProp = {}) => <Ico {...p} d="M6 4h4v16H6zM14 4h4v16h-4z"/>,
  play:    (p: IcoProp = {}) => <Ico {...p} d="M5 3l14 9-14 9V3z"/>,
  layers2: (p: IcoProp = {}) => <Ico {...p} d="M3 12l9 5 9-5M3 17l9 5 9-5M12 2L3 7l9 5 9-5-9-5z"/>,
};
