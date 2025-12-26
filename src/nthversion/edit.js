/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { RadioControl, PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { useEffect, useRef, useState, useMemo } from '@wordpress/element';
import { TextControl } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */


export default function Edit({ attributes, setAttributes }) {
const postId = useSelect( s => s('core/editor').getCurrentPostId(), [] );
const { editPost } = useDispatch( editorStore );
// Fetch more posts to increase chance of finding nthversion posts
// Note: We fetch up to 20 posts and filter client-side since we can't filter by block content in REST API
const allPosts = useSelect( s => s(coreDataStore).getEntityRecords(
  'postType','post',
  { per_page:20, order:'desc', orderby:'date', status:'publish', exclude: postId ? [postId] : undefined }
), [postId]);

// Filter to only posts that start with the nthversion block
const nthversionPosts = useMemo(() => {
  if (!allPosts || !Array.isArray(allPosts)) return [];
  
  return allPosts.filter(post => {
    // Check if post content starts with the nthversion block
    // The content will be in block format, so we check for the block name
    if (!post.content) return false;
    
    // Try raw content first (available in editor context), fallback to rendered
    const content = post.content.raw || post.content.rendered || '';
    
    if (!content) return false;
    
    // Parse the content to check if first block is nthversion
    // Block format: <!-- wp:janmckell/nthversion -->
    const nthversionBlockPattern = /<!--\s*wp:janmckell\/nthversion/;
    
    return nthversionBlockPattern.test(content);
  });
}, [allPosts]);

// Get the most recent nthversion post, or fall back to most recent post if no nthversion posts exist
// This maintains backward compatibility with existing posts that have version numbers in titles
const lastPost = useMemo(() => {
  // Prefer nthversion posts if they exist
  if (nthversionPosts && nthversionPosts.length > 0) {
    return nthversionPosts[0];
  }
  // Fallback to most recent post (backward compatibility)
  return allPosts?.[0];
}, [nthversionPosts, allPosts]);

const init = useRef(false);

useEffect(() => {
  if (!lastPost || init.current) return;
  const m = (lastPost.title?.rendered || '').match(/v\s*(\d+(?:\.\d+)?)/i);
  if (m) { setAttributes({ versionNumber: parseFloat(m[1]) }); init.current = true; }
}, [lastPost, setAttributes]);

const { versionNumber } = attributes;
const [versionType, setVersionType] = useState('');

const calculatedVersionNumber = (type) =>
  type === 'major' ? Math.floor(versionNumber) + 1 : +( (versionNumber + 0.1).toFixed(1) );

// Sync block output to post title whenever versionNumber changes
useEffect(() => {
  if (versionNumber) {
    const title = 'Core Confidence v' + versionNumber;
    editPost({ title: title });
  }
}, [versionNumber, editPost]);

	const handleVersionTypeChange = (value) => {
		setVersionType(value);
		setAttributes({ versionNumber: calculatedVersionNumber(value) });
	};

		return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title="Version type">
				<RadioControl
					help="Is this a major version or a minor update?"
					selected={versionType || ''}
					options={[
					{ label: 'Major', value: 'major' },
					{ label: 'Minor', value: 'minor' },
					]}
					onChange={handleVersionTypeChange}
				/>
				</PanelBody>
				<PanelBody title="Styling">
					<TextControl
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						label="Additional CSS Class"
						value={ attributes.className || '' }
						onChange={ ( value ) => setAttributes({ className: value }) }
					/>
				</PanelBody>
			</InspectorControls>
		  <h2 class="wp-block-post-title">{ 'Core Confidence v' + versionNumber }</h2>
		  </div>
		);
	}

