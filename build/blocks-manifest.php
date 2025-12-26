<?php
// This file is generated. Do not modify it manually.
return array(
	'nthversion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'janmckell/nthversion',
		'version' => '0.1.0',
		'title' => 'Nthversion',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Update Post titles using a versioning structure.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'versionType' => array(
				'type' => 'string',
				'default' => 'minor'
			),
			'versionNumber' => array(
				'type' => 'number',
				'default' => 2.8
			),
			'className' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'nthversion',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
