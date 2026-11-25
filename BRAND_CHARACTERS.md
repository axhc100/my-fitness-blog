# FitKit Brand Visual Identity: Official Characters

All future FitKit article illustrations and visual media **MUST** feature one of the following two official brand personas (alternating between them).

---

## 🔑 Core Rule: Strict Face-Lock + Mandatory Daily Hairstyle Rotation
- **Facial Features (Strictly Locked via Local Reference Image)**: Maintain the exact facial bone structure, eye shape, nose, lips, facial proportions, and age (early 20s) matching the official reference baselines below. **CRITICAL TECHNICAL REQUIREMENT**: When invoking `image-generator`, ALWAYS download the selected persona's baseline image from CDN to a temporary local path (e.g. `D:\my-fitness-blog\scripts\temp_media\ref_persona.jpg`) and pass that **local path** for `ImagePaths` (remote HTTPS URLs are ignored by `generate_image`).
- **Mandatory Hairstyle Rotation (Anti-Ponytail Default Rule)**: Do NOT default to a basic ponytail! Always style hair, hair color, and outfits strictly according to the daily schedule and exercise mood below (explicitly specify the hairstyle in the generation prompt while locking the face from the reference image):
  - **Monday (Yoga & Pilates)** → **Persona 2 (East Asian)**: Loose **messy ballet bun / top knot** with soft face-framing wisps (`松弛感芭蕾丸子头`), dark espresso or jet black hair; sage/cream/pastel Pilates attire.
  - **Tuesday (Body Sculpting & Toning)** → **Persona 1 (Western)**: **Soft natural waves** worn down or **half-up top knot** (`法式微卷自然披肩发 / 半扎发髻`), warm honey blonde hair; neutral/terracotta/olive seamless sets.
  - **Wednesday (Functional Fitness & Calisthenics)** → **Persona 2 (East Asian)**: Tight, edgy **double boxer braids / Dutch braids** (`酷感双拳击辫`), silky black hair; matte black/charcoal technical sportswear.
  - **Thursday (Trending Sports & Outdoor)** → **Persona 1 (Western)**: **Sleek chin-length bob** (`利落齐下巴短鲍伯头`, platinum/ash blonde) or **sporty athletic visor / baseball cap** (`运动遮阳帽`); modern outdoor/court sportswear.
  - **Friday (Strength & Hypertrophy)** → **Persona 2 (East Asian)**: **Sleek middle-parted straight hair** (`极简清冷中分直发`, silky jet black) or **slicked-back low bun**; minimalist gym crop top with wrist wraps.
  - **Saturday (Holistic Wellness & Recovery)** → **Persona 1 (Western)**: **Relaxed low chignon / claw-clip updo** (`慵懒低发髻 / 抓夹盘发`) with loose soft tendrils, golden brown or honey blonde hair; cozy oat-milk/beige ribbed loungewear.

---

## Persona 1: Western Female Athlete
- **Ethnicity & Age**: Young Caucasian female athlete in her early 20s.
- **Face (Locked Identity)**: Delicate symmetrical European facial features, straight refined nose, warm hazel/light-brown eyes, clean radiant complexion.
- **Physique**: Lean, athletic, toned shoulders and core, graceful athletic posture.
- **Flexible Hair & Outfits**:
  - *Hairstyles*: Sleek bob, high athletic ponytail, boxer braids, top bun, or natural waves.
  - *Hair Colors*: Platinum blonde, warm honey blonde, golden brown, or dark chestnut.
  - *Attire*: Seamless athletic sets, sports bras, yoga apparel, tennis skirts, running shorts, oversized hoodies, or moisture-wicking tees matching the sport.
- **Official Reference Baseline (Permanent CDN)**:
  `https://cdn.jsdelivr.net/gh/axhc100/my-blog-images@main/characters/fitkit_brand_character_western_blonde_bob.png`

---

## Persona 2: East Asian Female Athlete (Sweet-Cool Idol & Athletic Chic)
- **Ethnicity & Age**: Young East Asian female athlete in her early 20s (100% original, copyright-safe virtual persona).
- **Face (Locked Identity)**:
  - Youthful, delicate oval face with a soft feminine jawline and dainty chin.
  - Expressive, large almond-shaped dark hazel/brown eyes with subtle double eyelid fold and natural gentle aegyo-sal.
  - Dainty, slender straight nasal bridge with refined tip.
  - Soft, naturally contoured lips; luminous fair porcelain skin with authentic healthy dewy glow.
  - Calm, cool, charismatic and confident gaze (清冷高级感、又美又飒的酷系运动少女神态).
- **Physique**: Slender, athletic, toned dancer/fitness build, long graceful neck, sculpted collarbones, flat toned waist/core.
- **Flexible Hair & Outfits**:
  - *Hairstyles*: Sleek middle-parted straight black hair, high athletic ponytail, braided gym hair, half-up knot, or messy workout bun.
  - *Hair Colors*: Silky jet black, dark espresso, ash brown, or soft mocha.
  - *Attire*: Modern black athletic crop tops, high-waisted seamless leggings, sporty track pants with white trim, wrist wraps, Pilates/yoga sets, windbreakers.
- **Official Reference Baseline (Permanent CDN - Approved Option A)**:
  `https://cdn.jsdelivr.net/gh/axhc100/my-blog-images@main/characters/fitkit_asian_persona_v4_cool_editorial.jpg`

---

## Visual Consistency Rules for Image Generation
1. **Aspect Ratio**: Always 16:9 widescreen landscape for article banners.
2. **Photography Style**: High-end commercial sports photography, natural gym or outdoor lighting, sharp focus on the character and sports action, shallow depth of field in background, 8k resolution.
3. **Anatomical & Biomechanical Rigor**:
   - Natural hands with 5 fingers, authentic grip on sports equipment (dumbbells, barbells, mats, straps).
   - Biomechanically accurate movement postures matching the article topic.
4. **Cleanliness**: Absolutely NO text overlays, NO logos/watermarks, NO anatomical distortion.
