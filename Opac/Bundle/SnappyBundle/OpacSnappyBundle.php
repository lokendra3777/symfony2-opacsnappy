<?php

namespace Opac\Bundle\SnappyBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle as BaseBundle;

class OpacSnappyBundle extends BaseBundle
{
    /**
     * {@inheritdoc}
     */
    public function getNamespace()
    {
        return __NAMESPACE__;
    }

    /**
     * {@inheritdoc}
     */
    public function getPath()
    {
        return strtr(__DIR__, '\\', '/');
    }
}
