// Pagination.tsx  (React Native)

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    GestureResponderEvent,
} from 'react-native';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: 'basic' | 'classic';
    /** extra container styles */
    style?: any;
};

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages = 1,
    onPageChange,
    variant = 'basic',
    style,
}) => {
    if (totalPages <= 1) return null;

    const handleClick = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    /* ---------- BASIC ---------- */
    const renderBasic = () => (
        <View style={[styles.container, style]}>
            <Button
                label="Prev"
                disabled={currentPage === 1}
                onPress={() => handleClick(currentPage - 1)}
            />
            <Text style={styles.pageText}>
                Page {currentPage} of {totalPages}
            </Text>
            <Button
                label="Next"
                disabled={currentPage === totalPages}
                onPress={() => handleClick(currentPage + 1)}
            />
        </View>
    );

    /* ---------- CLASSIC ---------- */
    const renderClassic = () => {
        const pages: (number | string)[] = [];

        pages.push(1); // always show first page

        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(currentPage);
        } else if (currentPage === 1 && totalPages > 2) {
            pages.push(2);
        } else if (currentPage === totalPages && totalPages > 2) {
            pages.push(totalPages - 1);
        }

        if (totalPages > 2) {
            pages.push('…');
        }

        if (totalPages > 1) {
            pages.push(totalPages); // always show last page
        }

        return (
            <View style={[styles.container, style]}>
                <Button
                    label="Prev"
                    disabled={currentPage === 1}
                    onPress={() => handleClick(currentPage - 1)}
                />
                {pages.map((p, idx) =>
                    typeof p === 'number' ? (
                        <Button
                            key={idx}
                            label={String(p)}
                            onPress={() => handleClick(p)}
                            variant={p === currentPage ? 'active' : undefined}
                        />
                    ) : (
                        <Text key={idx} style={styles.ellipsis}>…</Text>
                    )
                )}
                <Button
                    label="Next"
                    disabled={currentPage === totalPages}
                    onPress={() => handleClick(currentPage + 1)}
                />
            </View>
        );
    };


    return variant === 'classic' ? renderClassic() : renderBasic();
};

export default Pagination;

/* ------------------------------------------------------------------ */
/* 🔸 Reusable inner Button component */

type BtnProps = {
    label: string;
    onPress: (e: GestureResponderEvent) => void;
    disabled?: boolean;
    variant?: 'active';
};

const Button: React.FC<BtnProps> = ({ label, onPress, disabled, variant }) => (
    <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
            styles.button,
            variant === 'active' && styles.activeButton,
            disabled && styles.disabledButton,
        ]}
    >
        <Text style={[
            styles.buttonText,
            variant === 'active' && styles.activeButtonText,
            disabled && styles.disabledButtonText,
        ]}>
            {label}
        </Text>
    </TouchableOpacity>
);

/* ------------------------------------------------------------------ */
/* 🔸 Styles */

const styles = StyleSheet.create({
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
