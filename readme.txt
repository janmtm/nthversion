=== Nthversion ===
Contributors:      janmtm
Tags:              block, versioning, title, post-format
Requires at least: 6.7
Tested up to:      6.7
Requires PHP:      7.4
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A WordPress block that automatically manages post titles using a versioning structure. Perfect for versioned content, changelogs, or release notes.

== Description ==

Nthversion is a WordPress block plugin that automatically manages post titles using a semantic versioning structure. The block automatically syncs its output to the post title in the database, ensuring consistency across your site.

**Key Features:**

* Automatic version number detection from previous posts
* Major and minor version increment options
* Automatic title synchronization (block output becomes the post title)
* Backward compatible with existing posts
* Works seamlessly with the nthversion-format-enabler plugin

**How It Works:**

The nthversion block displays "Core Confidence v{versionNumber}" and automatically updates the post title in the database whenever the version number changes. When used with the nthversion-format-enabler plugin, the block replaces the standard post title on the frontend, creating a seamless versioning experience.

**Requirements:**

* WordPress 6.7 or higher
* Block theme (recommended)
* nthversion-format-enabler plugin (for full post format integration)

== Installation ==

1. Upload the `nthversion` folder to the `/wp-content/plugins/` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. (Optional) Install and activate the `nthversion-format-enabler` plugin for full post format integration.

**Note:** For the best experience, install the nthversion plugin first, then activate the nthversion-format-enabler plugin.

== Frequently Asked Questions ==

= Will the updated title remain in the Editor after saving ?

Yes, the title will remain. It is best to write your post, and even save it as draft, but then update the title just before publishing it live. 

= Do I need the nthversion-format-enabler plugin? =

The nthversion block works on its own, but the nthversion-format-enabler plugin provides:
* A dedicated "New Nthversion" post creation option
* Automatic block insertion when creating nthversion posts
* Title field hiding in the editor
* Frontend title replacement
* It starts at v2.8 by default if there is no previous 'Nthversion' post.

For full functionality, both plugins are recommended.

= How does version detection work? =

The block automatically checks the most recent nthversion post (or falls back to any post if none exist) and extracts the version number from the title. It then suggests the next version based on whether you select "Major" or "Minor" increment.

= Can I use this block in regular posts? =

Yes, the block can be used in any post. However, for the full experience with automatic title synchronization and frontend replacement, use it with the nthversion post format via the nthversion-format-enabler plugin.

= What happens to existing posts? =

The plugin is backward compatible. If you have existing posts with version numbers in their titles (like "Core Confidence v2.8"), the block will detect and use those version numbers when creating new posts.

== Changelog ==

= 0.1.0 =
* Initial release
* Automatic version number detection
* Major and minor version increment options
* Title synchronization with post database
* Backward compatibility with existing posts
* Integration with nthversion-format-enabler plugin
