# AWS Lambda + PDFtk Example

This repository provides a working example of using PDFtk within AWS Lambda. AWS Lambda runs on Amazon Linux, which does not officially support PDFtk or GCJ, one of PDFtk's dependencies. This example works by including both a PDFtk binary and the libgcj shared library.

## Run the Example

To run the example, first package up the project into a ZIP file by running:

```
./dist.sh
```

Then, simply upload this ZIP to AWS Lambda. When testing with the Lambda web interface, you should see the function succeed and output PDFtk's version and copyright information.

You can very easily expand on this boilerplate and use PDFtk in the way it was intended for - manipulating PDF files.

## How it Works

AWS Lambda supports binary dependencies by allowing them to be included in uploaded ZIP files. However, because Amazon Linux does not support PDFtk or GCJ, PDFtk was built from source in CentOS, a close relative of Amazon Linux. I spun up a CentOS 6 machine in EC2 and followed the instructions on the [PDFtk website](https://www.pdflabs.com/docs/install-pdftk-on-redhat-or-centos/) to build PDFtk from source.

```
sudo yum install gcc gcc-java libgcj libgcj-devel gcc-c++

wget https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/pdftk-2.02-src.zip

unzip pdftk-2.02-src.zip

cd pdftk-2.02-dist/pdftk

make -f Makefile.Redhat

sudo make -f Makefile.Redhat install
```

Then I copied the resulting `pdftk` binary and `/usr/lib64/libgcj.so.10` shared library into the `bin/` directory of my Lambda project.

The entry point to the lambda function, `index.js`, alters the `PATH` and `LD_LIBRARY_PATH` environment variables to let the system know where to find the binary and the GCJ dependency.

## Using PDFtk in Amazon Linux

It should be possible to use the PDFtk binary and GCJ shared library located in the `bin/` directory of this file to run PDFtk in Amazon Linux on EC2. Simply copy them onto the machine and put them in the correct path, or call them directly:

```
LD_LIBRARY_PATH=/path/to/libgcj.so.10 /path/to/pdftk --version
```
