<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;

class ThreadAdmin extends AbstractAdmin
{
    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('title')
        ->add('text')
        ->add('threadMessages')
        ->add('session')
        ->add('author')
        ->add('createdAt');
    }

    // Fields on which entities can be filtered.
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('session')
        ->add('author');
    }

    // Fields that will be displayed in list view
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->addIdentifier('id')
            ->add('title')
            ->add('text')
            ->add('session')
            ->add('author')
            ->add('createdAt');
    }
}
