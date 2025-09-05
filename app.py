import streamlit as st
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
import io
import base64
from typing import Optional, Tuple
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

class DesignStyleProcessor:
    """Handles different design style transformations"""
    
    def __init__(self):
        self.exterior_styles = {
            'Modern': {'saturation': 1.2, 'brightness': 1.1, 'contrast': 1.3},
            'Traditional': {'saturation': 0.9, 'brightness': 1.0, 'contrast': 1.1},
            'Contemporary': {'saturation': 1.1, 'brightness': 1.2, 'contrast': 1.2},
            'Rustic': {'saturation': 0.8, 'brightness': 0.9, 'contrast': 1.0},
            'Mediterranean': {'saturation': 1.3, 'brightness': 1.1, 'contrast': 1.2},
            'Colonial': {'saturation': 0.9, 'brightness': 1.0, 'contrast': 1.1},
            'Craftsman': {'saturation': 1.0, 'brightness': 0.95, 'contrast': 1.1},
            'Victorian': {'saturation': 1.2, 'brightness': 1.0, 'contrast': 1.3}
        }
        
        self.interior_styles = {
            'Minimalist': {'saturation': 0.7, 'brightness': 1.3, 'contrast': 1.1},
            'Scandinavian': {'saturation': 0.8, 'brightness': 1.4, 'contrast': 1.0},
            'Industrial': {'saturation': 0.6, 'brightness': 0.9, 'contrast': 1.4},
            'Bohemian': {'saturation': 1.4, 'brightness': 1.1, 'contrast': 1.2},
            'Mid-Century Modern': {'saturation': 1.2, 'brightness': 1.1, 'contrast': 1.2},
            'Traditional': {'saturation': 1.0, 'brightness': 1.0, 'contrast': 1.1},
            'Contemporary': {'saturation': 1.1, 'brightness': 1.2, 'contrast': 1.2},
            'Art Deco': {'saturation': 1.3, 'brightness': 1.0, 'contrast': 1.4},
            'Farmhouse': {'saturation': 0.9, 'brightness': 1.1, 'contrast': 1.0},
            'Mediterranean': {'saturation': 1.2, 'brightness': 1.1, 'contrast': 1.1},
            'Rustic': {'saturation': 0.8, 'brightness': 0.9, 'contrast': 1.0},
            'Eclectic': {'saturation': 1.3, 'brightness': 1.1, 'contrast': 1.3},
            'Transitional': {'saturation': 1.0, 'brightness': 1.1, 'contrast': 1.1},
            'Glam': {'saturation': 1.2, 'brightness': 1.2, 'contrast': 1.3},
            'Coastal': {'saturation': 1.1, 'brightness': 1.3, 'contrast': 1.0},
            'Modern Farmhouse': {'saturation': 0.9, 'brightness': 1.2, 'contrast': 1.1},
            'French Country': {'saturation': 1.0, 'brightness': 1.0, 'contrast': 1.0},
            'Asian Zen': {'saturation': 0.7, 'brightness': 1.1, 'contrast': 0.9},
            'Gothic': {'saturation': 0.8, 'brightness': 0.8, 'contrast': 1.4},
            'Retro': {'saturation': 1.4, 'brightness': 1.0, 'contrast': 1.2}
        }

    def apply_style(self, image: Image.Image, style_name: str, design_type: str) -> Image.Image:
        """Apply a specific style to the image"""
        styles = self.exterior_styles if design_type == 'exterior' else self.interior_styles
        
        if style_name not in styles:
            return image
        
        style_params = styles[style_name]
        
        # Apply enhancements
        enhanced_image = image
        
        # Adjust saturation
        enhancer = ImageEnhance.Color(enhanced_image)
        enhanced_image = enhancer.enhance(style_params['saturation'])
        
        # Adjust brightness
        enhancer = ImageEnhance.Brightness(enhanced_image)
        enhanced_image = enhancer.enhance(style_params['brightness'])
        
        # Adjust contrast
        enhancer = ImageEnhance.Contrast(enhanced_image)
        enhanced_image = enhancer.enhance(style_params['contrast'])
        
        # Apply style-specific filters
        if style_name in ['Rustic', 'Farmhouse', 'French Country']:
            enhanced_image = enhanced_image.filter(ImageFilter.SMOOTH)
        elif style_name in ['Industrial', 'Gothic']:
            enhanced_image = enhanced_image.filter(ImageFilter.EDGE_ENHANCE)
        elif style_name in ['Minimalist', 'Scandinavian', 'Asian Zen']:
            enhanced_image = enhanced_image.filter(ImageFilter.SMOOTH_MORE)
        
        return enhanced_image

class ColorPaletteExtractor:
    """Extract and modify color palettes from images"""
    
    @staticmethod
    def extract_dominant_colors(image: Image.Image, n_colors: int = 5) -> list:
        """Extract dominant colors from image"""
        # Convert to RGB and reshape
        img_array = np.array(image.convert('RGB'))
        img_reshaped = img_array.reshape(-1, 3)
        
        # Use KMeans to find dominant colors
        kmeans = KMeans(n_clusters=n_colors, random_state=42, n_init=10)
        kmeans.fit(img_reshaped)
        
        colors = kmeans.cluster_centers_.astype(int)
        return [tuple(color) for color in colors]
    
    @staticmethod
    def create_color_palette_image(colors: list, width: int = 400, height: int = 100) -> Image.Image:
        """Create a visual representation of the color palette"""
        palette_img = Image.new('RGB', (width, height))
        color_width = width // len(colors)
        
        for i, color in enumerate(colors):
            for x in range(i * color_width, (i + 1) * color_width):
                for y in range(height):
                    palette_img.putpixel((x, y), color)
        
        return palette_img

class ImageProcessor:
    """Main image processing class"""
    
    def __init__(self):
        self.style_processor = DesignStyleProcessor()
        self.color_extractor = ColorPaletteExtractor()
    
    def preprocess_image(self, image: Image.Image, max_size: Tuple[int, int] = (800, 600)) -> Image.Image:
        """Preprocess uploaded image"""
        # Resize if too large
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        return image
    
    def enhance_image_quality(self, image: Image.Image) -> Image.Image:
        """Enhance image quality"""
        # Sharpen the image
        enhancer = ImageEnhance.Sharpness(image)
        image = enhancer.enhance(1.2)
        
        # Slight contrast boost
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(1.1)
        
        return image
    
    def process_design(self, image: Image.Image, style: str, design_type: str) -> dict:
        """Process the design with selected style"""
        # Preprocess
        processed_image = self.preprocess_image(image)
        
        # Apply style
        styled_image = self.style_processor.apply_style(processed_image, style, design_type)
        
        # Enhance quality
        final_image = self.enhance_image_quality(styled_image)
        
        # Extract color palette
        colors = self.color_extractor.extract_dominant_colors(final_image)
        palette_image = self.color_extractor.create_color_palette_image(colors)
        
        return {
            'original': processed_image,
            'styled': final_image,
            'colors': colors,
            'palette': palette_image
        }

def main():
    st.set_page_config(
        page_title="AI Design Studio",
        page_icon="🏠",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    # Custom CSS
    st.markdown("""
    <style>
    .main-header {
        text-align: center;
        padding: 2rem 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    .feature-card {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        border-left: 4px solid #667eea;
        margin: 1rem 0;
    }
    .color-box {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin: 5px;
        border-radius: 5px;
        border: 2px solid #ddd;
    }
    </style>
    """, unsafe_allow_html=True)
    
    # Header
    st.markdown("""
    <div class="main-header">
        <h1>🏠 AI Design Studio</h1>
        <p>Transform your spaces with AI-powered design rendering</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Initialize processor
    processor = ImageProcessor()
    
    # Sidebar
    with st.sidebar:
        st.header("🎨 Design Options")
        
        design_type = st.selectbox(
            "Choose Design Type",
            ["exterior", "interior"],
            format_func=lambda x: "🏡 Exterior Design" if x == "exterior" else "🛋️ Interior Design"
        )
        
        if design_type == "exterior":
            st.markdown("""
            <div class="feature-card">
                <h4>🏡 Exterior AI</h4>
                <p>Render or redesign your exterior designs in seconds. Just upload a photo or sketch and see the magic in action.</p>
            </div>
            """, unsafe_allow_html=True)
            
            style_options = list(processor.style_processor.exterior_styles.keys())
        else:
            st.markdown("""
            <div class="feature-card">
                <h4>🛋️ Interior AI</h4>
                <p>Upload a sketch or model to redesign your interior space with more than 20 unique styles.</p>
            </div>
            """, unsafe_allow_html=True)
            
            style_options = list(processor.style_processor.interior_styles.keys())
        
        selected_style = st.selectbox("Select Style", style_options)
        
        st.markdown("---")
        st.markdown("### 📋 Instructions")
        st.markdown("""
        1. Choose your design type (Exterior/Interior)
        2. Select a style from the dropdown
        3. Upload your image or sketch
        4. Click 'Generate Design' to see the transformation
        """)
    
    # Main content
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.header("📤 Upload Your Design")
        
        uploaded_file = st.file_uploader(
            "Choose an image file",
            type=['png', 'jpg', 'jpeg'],
            help="Upload a photo or sketch of your space"
        )
        
        if uploaded_file is not None:
            # Display original image
            image = Image.open(uploaded_file)
            st.image(image, caption="Original Image", use_column_width=True)
            
            # Generate button
            if st.button("🎨 Generate Design", type="primary"):
                with st.spinner("Applying AI magic... ✨"):
                    result = processor.process_design(image, selected_style, design_type)
                    
                    # Store in session state
                    st.session_state['result'] = result
                    st.session_state['style'] = selected_style
                    st.session_state['design_type'] = design_type
    
    with col2:
        st.header("✨ AI Generated Design")
        
        if 'result' in st.session_state:
            result = st.session_state['result']
            
            # Display styled image
            st.image(
                result['styled'], 
                caption=f"{st.session_state['style']} Style Applied",
                use_column_width=True
            )
            
            # Display color palette
            st.subheader("🎨 Color Palette")
            st.image(result['palette'], caption="Extracted Color Palette", use_column_width=True)
            
            # Color values
            st.subheader("🌈 Dominant Colors")
            cols = st.columns(len(result['colors']))
            for i, color in enumerate(result['colors']):
                with cols[i]:
                    st.markdown(
                        f'<div style="background-color: rgb{color}; height: 50px; border-radius: 5px; margin: 5px;"></div>',
                        unsafe_allow_html=True
                    )
                    st.caption(f"RGB{color}")
            
            # Download button
            img_buffer = io.BytesIO()
            result['styled'].save(img_buffer, format='PNG')
            img_buffer.seek(0)
            
            st.download_button(
                label="📥 Download Styled Image",
                data=img_buffer.getvalue(),
                file_name=f"{st.session_state['style'].lower().replace(' ', '_')}_design.png",
                mime="image/png"
            )
        else:
            st.info("👆 Upload an image and click 'Generate Design' to see the AI transformation!")
    
    # Features section
    st.markdown("---")
    st.header("🚀 Features")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div class="feature-card">
            <h4>⚡ Lightning Fast</h4>
            <p>Generate designs in seconds with our optimized AI algorithms</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="feature-card">
            <h4>🎨 Multiple Styles</h4>
            <p>Choose from 20+ unique interior and 8+ exterior design styles</p>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="feature-card">
            <h4>🌈 Color Analysis</h4>
            <p>Automatic color palette extraction and analysis</p>
        </div>
        """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()