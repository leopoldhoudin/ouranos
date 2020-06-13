### Links
- For icons: https://fontawesome.com/icons/play?style=solid
- For SVG: https://aydos.com/svgedit/
- HTML Codes for chars: https://www.rapidtables.com/web/html/html-codes.html (then convert from decimal to hexadecimal)

### Images / Textures
- http://planetpixelemporium.com/
- https://cdn.eso.org/images/large/eso0932a.jpg
- https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/NIHmZbghlilb1qj7b/milky-way-stars-in-space-virtual-reality-360-degree-video-elements-of-this-image-furnished-by-nasa_StprBfkdx_thumbnail-108010.png

## Next steps
- [x] Refacto state into smaller pieces => simulation + engine + etc...
- [x] Change speed to be power of 10 (i.e. exponent)
- [x] Graphics & UI share timestamp => Player.TimestampDisplay
- [x] Handle window resizing
- [x] Abstract bodies handling
- [x] Initial conditions handling + fix => frames spacing different between engine & graphics it appears
- [x] Init W.Engine w/ algo + physics + bodies specs
- [x] Activated state for menu buttons + Tooltip for menu buttons
- [x] Separate constants (params, physics, masses, etc...) from dynamic (timestamp, position, velocity, rotation)
- [ ] Basic bodies settings window; general (name, type); physical (mass, radius); graphical (texture)
- [ ] Fix bug close bodies window; go to editor; viewer is black
- [ ] Implement Euler Explicit
- [ ] EventType to reset engine + implementation
- [ ] Implement Euler Backward
- [ ] Basic engine settings window
- [ ] Graphics option: scale body
- [ ] Focus / follow body

## Idea box
- Have some record of orbital elements + charts... Will need to think about how
  to set the reference (central body, ref direction, ref plane)
- Use better interpolation for frame requests from Graphics?
  Quadratic for instance? Gain in "simulation" accuracy VS performance impact?
- Dynamic nb of requested frames based on consecutive frames requests in engine
  engine.getFrameAt // speed at which the buffer decreases? => that would allow
  not to have too often the 'Buffering...' status
- I18N support?
