OpacSnappyBundle
===============

[Snappy][snappy] is a PHP (5.3+) wrapper for the [phantomjs][phantomjs] conversion utility.
It allows you to generate either pdf or image files from your html documents, using the webkit engine.

The OpacSnappyBundle provides a simple integration for your Symfony project.

[![opacbundles.com](http://opacbundles.com/OpacLabs/OpacSnappyBundle/badge-short)](http://opacbundles.com/OpacLabs/OpacSnappyBundle)

Installation
------------

With [composer](http://packagist.org), add:

    {
        require: {
            "opaclabs/opac-snappy-bundle": "dev-master"
        }
    }

Then enable it in your kernel:

    // app/AppKernel.php
    public function registerBundles()
    {
        $bundles = array(
            ...
            new Opac\Bundle\SnappyBundle\OpacSnappyBundle(),
            ...

Configuration
-------------

If you need to change the binaries, change the instance options or even disable one or both services, you can do it through the configuration.

    # app/config/config.yml
    opac_snappy:
        pdf:
            enabled:    true
            binary:     /usr/local/bin/phantomjs
            options:    []
        image:
            enabled:    true
            binary:     /usr/local/bin/phantomjs
            options:    []

Usage
-----

The bundle registers two services:

 - the `opac_snappy.image` service allows you to generate images;
 - the `opac_snappy.pdf` service allows you to generate pdf files.

### Generate an image from an URL

    $container->get('opac_snappy.image')->generate('http://www.google.fr', '/path/to/the/image.jpg');

### Generate a pdf document from an URL

    $container->get('opac_snappy.pdf')->generate('http://www.google.fr', '/path/to/the/file.pdf');

### Generate a pdf document from a twig view

    $this->get('opac_snappy.pdf')->generateFromHtml(
        $this->renderView(
            'MyBundle:Foo:bar.html.twig',
            array(
                'some'  => $vars
            )
        ),
        '/path/to/the/file.pdf'
    );

### Render an image as response from a controller

    $html = $this->renderView('MyBundle:Foo:bar.html.twig', array(
        'some'  => $vars
    ));

    return new Response(
        $this->get('opac_snappy.image')->getOutputFromHtml($html),
        200,
        array(
            'Content-Type'          => 'image/jpg',
            'Content-Disposition'   => 'filename="image.jpg"'
        )
    );

### Render a pdf document as response from a controller

    $html = $this->renderView('MyBundle:Foo:bar.html.twig', array(
        'some'  => $vars
    ));

    return new Response(
        $this->get('opac_snappy.pdf')->getOutputFromHtml($html),
        200,
        array(
            'Content-Type'          => 'application/pdf',
            'Content-Disposition'   => 'attachment; filename="file.pdf"'
        )
    );
    
### Render a pdf document with a relative url inside like css files

    $pageUrl = $this->generateUrl('homepage', array(), true); // use absolute path!
    
    return new Response(
        $this->get('opac_snappy.pdf')->getOutput($pageUrl),
        200,
        array(
            'Content-Type'          => 'application/pdf',
            'Content-Disposition'   => 'attachment; filename="file.pdf"'
        )
    );

Credits
-------

SnappyBundle and [Snappy][snappy] are based on the awesome [phantomjs][phantomjs].
SnappyBundle has been developed by [OpacLabs][OpacLabs].

[snappy]: https://github.com/lokendra3777/symfony2-opacsnappy
[phantomjs]: http://phantomjs.org/
[OpacLabs]: http://www.opaclabs.com
