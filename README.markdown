OpacSnappyBundle
===============

[Snappy][snappy] is a PHP (5.3+) wrapper for the [phantomjs][phantomjs] conversion utility.
It allows you to generate either pdf or image files from your html documents, using the webkit engine.

The OpacSnappyBundle provides a simple integration for your Symfony project.

[![opaclabs.com](http://opacbundles.com/OpacLabs/OpacSnappyBundle/badge-short)](http://opacbundles.com/OpacLabs/OpacSnappyBundle)

Installation
------------




Don’t you just love to hear one lovely sentence - "Hey, we’ve got a new server-side generated PDF document to make". When you’re a Php developer, all you can do then is hit yourself in the face with an empty plate to prepare for incoming pain - all FPDF based libraries will make sure of that. But.. there’s a different solution - Wkhtmltopdf, WebKit based shell utility for html to pdf conversion written in C++. Now the question is - how to use it in Symfony 2.1.x framework?


First thing that’ll we need here is of course phantomjs utility, which can be downloaded here - http://phantomjs.org
 If you’re using Linux, the best place for unpacking archive’s content and place the 'phantomjs' binary/executable would be /usr/local/bin/ directory (but you can choose any other that suits you). Remember to grant 755 permissions on the executable.

Next we’ll need to get the OpacSnappyBundle - Symfony 2.x wrapper bundle for the Snappy library which is a Php wrapper for phantomjs.
My preferred way of fetching both is to manually use git clone in root directory of your Symfony2 project:

###
   git clone https://github.com/lokendra3777/symfony2-opacsnappy ./


### Once we have cloned both repositories, we must add proper namespaces in Symfony2’s composer. I prefer the manual way - you’ll need to add namespaces to the array in vendor/composer/autoload_namespaces.php file, just before '' => $baseDir . '/src/', element:

   return array(
    ...
    // General Knp bundles namespace
    'Opac' => $vendorDir . '/bundles/',
    // Snappy library namespace
    'Opac\\Snappy'  => $vendorDir . '/opacsnappy/src/',
    
### Just one more step - we’ll need to add OpacSnappyBundle to app/AppKernel.php to registered namespaces array:


   public function registerBundles()
   {
      $bundles = array(
        ...
        new Opac\Bundle\SnappyBundle\OpacSnappyBundle(),  
        
        
Snappy can be called by using the get service method on any container object. In controller actions the magic is done like this:
$this->get('opac_snappy.pdf')->generate('http://www.cnn.com', '/var/www/my_app/web/pdf');         
    
    
###  Above code will save target webpage to a PDF file. You can also output any twig template in controller return statement like this:

   return new Response(
    $this->get('opac_snappy.pdf')->getOutputFromHtml(
        $this->renderView(
            'ExampleBundle:Something:sweetPdfTemplate.html.twig', 
            array()
        )
    ),
    200,
    array(
        'Content-Type'          => 'application/pdf',
        'Content-Disposition'   => 'attachment; filename="pdf-file.pdf"'
    )
  );

    

Configuration
-------------

If you need to change the binaries, change the instance options or even disable one or both services, you can do it through the configuration.

    # app/config/config.yml
    opac_snappy:
        pdf:
            enabled:    true
            binary:     /usr/local/bin/phantomjs
            options:    
        image:
            enabled:    true
            binary:     /usr/local/bin/phantomjs
            options:    

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

OpacSnappyBundle and [opacsnappy] are based on the awesome [phantomjs][phantomjs].
OpacSnappyBundle has been developed by [OpacLabs][OpacLabs].

[snappy]: https://github.com/lokendra3777/symfony2-opacsnappy
[phantomjs]: http://phantomjs.org/
[OpacLabs]: http://www.opaclabs.com
