import { createIcon } from '@chakra-ui/icon';

export const LandingBlob = createIcon({
  displayName: 'LandingBlog',
  viewBox: '0 0 200 200',
  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <g>
      <path
        fill="#FF9717"
        d="M131.1 60.7c13.7 13.8 32.5 19.3 40.5 31.5 8 12.3 5.1 31.4-7.2 37.8-12.2 6.5-33.9.4-51.1 6.7-17.1 6.3-29.8 24.9-45.4 29-15.5 4.1-33.9-6.5-41.8-22.1-8-15.7-5.5-36.4 2.7-51.4C37.1 77.1 51.1 67.8 64 53.9c12.8-14 24.4-32.5 34.5-30.8 10.2 1.8 18.9 23.8 32.6 37.6z"
      />
    </g>
  ),
  defaultProps: {
    preserveAspectRatio: 'xMinYMid meet',
  },
});
