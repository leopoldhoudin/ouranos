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
- [x] Basic bodies settings window; general (name, type); physical (mass, radius); graphical (texture)
- [x] Fix bug close bodies window; go to editor; viewer is black
- [x] Add validator on body name update => check if not already a name of another body! + cannot save body if there is an error
- [x] Implement new body (crashes for now :p)
- [x] Implement delete body
- [x] Implement Euler Explicit
- [x] EventType to reset engine + implementation
- [ ] Fix pause resets x0.1 to x1
- [ ] Basic engine settings window
- [ ] Graphics option: update settings "restart" graphics engine + axes + scale body + body texture on/off (only mesh grid)
- [ ] Focus / follow body
- [ ] Updates of a body in the Settings Window are reflected on the Graphics + Engine
- [x] Add ui.Input explanation why is not valid => validator could return NULL if valid; string w/ message if not valid;
      Use small icon + tooltip on right side of input of before value?
- [ ] Have confirmation window when deleting a body
- [ ] Real scale toy system (use AU)
- [ ] Benchmarks:
  - [ ] create + operations are faster if "pure data" objects for vector/matrix? (ie no namespace, only data, and operations are pure functional)
  - [ ] experiment different operations with for-loops and other approaches
- [ ] Implement Euler Backward

## Idea box
- Have some record of orbital elements + charts... Will need to think about how
  to set the reference (central body, ref direction, ref plane)
- Use better interpolation for frame requests from Graphics?
  Quadratic for instance? Gain in "simulation" accuracy VS performance impact?
- Dynamic nb of requested frames based on consecutive frames requests in engine
  engine.getFrameAt // speed at which the buffer decreases? => that would allow
  not to have too often the 'Buffering...' status
- I18N support?
