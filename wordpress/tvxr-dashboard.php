<?php
/**
 * Plugin Name: TVXR Dashboard
 * Description: Embeds the TVXR React dashboard via [tvxr_dashboard] shortcode.
 * Version: 1.0.0
 * Author: TVXR
 */

if (!defined('ABSPATH')) {
    exit;
}

function tvxr_dashboard_shortcode() {
    // Enqueue only when the shortcode is used
    wp_enqueue_script(
        'tvxr-dashboard-js',
        plugin_dir_url(__FILE__) . 'dist/dashboard.js',
        [],
        '1.0.0',
        true // load in footer
    );

    wp_enqueue_style(
        'tvxr-dashboard-css',
        plugin_dir_url(__FILE__) . 'dist/dashboard.css',
        [],
        '1.0.0'
    );

    return '<div id="dashboard-root"></div>';
}
add_shortcode('tvxr_dashboard', 'tvxr_dashboard_shortcode');

// Add type="module" to the dashboard script tag
function tvxr_dashboard_script_type($tag, $handle, $src) {
    if ($handle === 'tvxr-dashboard-js') {
        return '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}
add_filter('script_loader_tag', 'tvxr_dashboard_script_type', 10, 3);
