"use strict";
// Pagination.tsx  (React Native)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Pagination = ({ currentPage, totalPages = 1, onPageChange, variant = 'basic', style, }) => {
    if (totalPages <= 1)
        return null;
    const handleClick = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };
    /* ---------- BASIC ---------- */
    const renderBasic = () => (react_1.default.createElement(react_native_1.View, { style: [styles.container, style] },
        react_1.default.createElement(Button, { label: "Prev", disabled: currentPage === 1, onPress: () => handleClick(currentPage - 1) }),
        react_1.default.createElement(react_native_1.Text, { style: styles.pageText },
            "Page ",
            currentPage,
            " of ",
            totalPages),
        react_1.default.createElement(Button, { label: "Next", disabled: currentPage === totalPages, onPress: () => handleClick(currentPage + 1) })));
    /* ---------- CLASSIC ---------- */
    const renderClassic = () => {
        const pages = [];
        pages.push(1); // always show first page
        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(currentPage);
        }
        else if (currentPage === 1 && totalPages > 2) {
            pages.push(2);
        }
        else if (currentPage === totalPages && totalPages > 2) {
            pages.push(totalPages - 1);
        }
        if (totalPages > 2) {
            pages.push('…');
        }
        if (totalPages > 1) {
            pages.push(totalPages); // always show last page
        }
        return (react_1.default.createElement(react_native_1.View, { style: [styles.container, style] },
            react_1.default.createElement(Button, { label: "Prev", disabled: currentPage === 1, onPress: () => handleClick(currentPage - 1) }),
            pages.map((p, idx) => typeof p === 'number' ? (react_1.default.createElement(Button, { key: idx, label: String(p), onPress: () => handleClick(p), variant: p === currentPage ? 'active' : undefined })) : (react_1.default.createElement(react_native_1.Text, { key: idx, style: styles.ellipsis }, "\u2026"))),
            react_1.default.createElement(Button, { label: "Next", disabled: currentPage === totalPages, onPress: () => handleClick(currentPage + 1) })));
    };
    return variant === 'classic' ? renderClassic() : renderBasic();
};
exports.default = Pagination;
const Button = ({ label, onPress, disabled, variant }) => (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPress, disabled: disabled, style: [
        styles.button,
        variant === 'active' && styles.activeButton,
        disabled && styles.disabledButton,
    ] },
    react_1.default.createElement(react_native_1.Text, { style: [
            styles.buttonText,
            variant === 'active' && styles.activeButtonText,
            disabled && styles.disabledButtonText,
        ] }, label)));
/* ------------------------------------------------------------------ */
/* 🔸 Styles */
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        justifyContent: "space-between",
        width: "100%"
    },
    pageText: { fontSize: 14 },
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#1a73e8',
        borderRadius: 4,
    },
    buttonText: { color: '#1a73e8', fontSize: 14 },
    activeButton: { backgroundColor: '#1a73e8' },
    activeButtonText: { color: '#fff' },
    disabledButton: { borderColor: '#bbb' },
    disabledButtonText: { color: '#bbb' },
    ellipsis: { paddingHorizontal: 4, fontSize: 16 },
});
