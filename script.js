// Simple CMS - Content Management via localStorage
// Allows editing page content in-browser

const CMS = {
    // Default content
    defaults: {
        'site-title': 'Corporate Portfolio',
        'about-text': 'We are a leading provider of corporate solutions, delivering excellence and innovation.',
        'hero-title': 'Welcome to Our Portfolio',
        'hero-subtitle': 'Building excellence, delivering results.'
    },

    // Load saved content or use defaults
    load() {
        const saved = localStorage.getItem('cms-content');
        return saved ? JSON.parse(saved) : { ...this.defaults };
    },

    // Save content to localStorage
    save(content) {
        localStorage.setItem('cms-content', JSON.stringify(content));
    },

    // Apply content to the page
    apply(content) {
        Object.keys(content).forEach(key => {
            const el = document.getElementById(key);
            if (el) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.value = content[key];
                } else {
                    el.textContent = content[key];
                }
            }
        });
    },

    // Initialize the CMS
    init() {
        const content = this.load();
        this.apply(content);
        this.setupEditor();
    },

    // Setup inline editing (double-click to edit)
    setupEditor() {
        document.querySelectorAll('[id]').forEach(el => {
            el.addEventListener('dblclick', () => {
                this.editElement(el);
            });
            el.title = 'Double-click to edit';
        });
    },

    // Edit an element's content
    editElement(el) {
        const id = el.id;
        const current = el.textContent || el.value || '';
        const input = document.createElement('input');
        input.type = 'text';
        input.value = current;
        input.style.cssText = 'width:90%;padding:0.5rem;font-size:1rem;border:2px solid #3498db;border-radius:4px;';

        el.replaceWith(input);
        input.focus();
        input.select();

        const save = () => {
            const newValue = input.value.trim();
            const content = this.load();
            content[id] = newValue;
            this.save(content);
            input.replaceWith(el);
            el.textContent = newValue;
        };

        input.addEventListener('blur', save);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') input.blur();
            if (e.key === 'Escape') input.replaceWith(el);
        });
    },

    // Export content as JSON for backup
    export() {
        const content = this.load();
        const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cms-content.json';
        a.click();
        URL.revokeObjectURL(url);
    },

    // Reset to defaults
    reset() {
        if (confirm('Reset all content to defaults? This cannot be undone.')) {
            localStorage.removeItem('cms-content');
            location.reload();
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => CMS.init());