The reason for setting the color texture to the sRGB color space, but not the others, is rooted in the different roles these textures play and the nature of color representation.

1. **Color Textures (Diffuse Maps)**:
    - These textures represent the surface color of an object. They need to appear visually correct on a variety of displays.
    - The sRGB color space is a standard used for images, video, and graphics that are meant to be displayed on consumer devices. It ensures that colors are displayed consistently across different devices.
    - When you set a color texture to the sRGB color space, you're making sure that the color is gamma-corrected to look right when rendered on a standard display.

2. **Other Textures (Normal Maps, AO, Roughness, Metalness, etc.)**:
    - These textures provide data, not necessarily visual color. They inform the shader how to respond to light, how rough a surface is, etc.
    - The values in these textures aren't colors meant for direct display; they're more like instructions for the renderer. Thus, these textures typically use a linear color space.
    - Applying sRGB gamma correction to these textures can distort their intended values, leading to incorrect shading and lighting in the rendered result.

In summary, color textures (diffuse maps) are meant to convey visual color and thus need to account for display gamma correction via sRGB. Other maps are data-driven and generally shouldn't undergo gamma correction, which is why they don't get set to the sRGB color space.