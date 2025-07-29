<?php
// Force cache bust - run this once to update assets version
require_once('functions.php');

// Update the assets version to current timestamp
update_option('bevision_assets_version', time());

echo "Assets version updated to: " . get_option('bevision_assets_version') . "\n";
echo "Cache should now be busted. Try refreshing your page.\n";
?>
