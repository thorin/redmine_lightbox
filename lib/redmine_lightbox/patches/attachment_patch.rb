require 'attachment'

module RedmineLightbox
  module Patches
    module AttachmentPatch
      extend ActiveSupport::Concern

      included do

        PREVIEW_TRANSFORMATIONS = {
          '.doc' => 'pdf',
          '.docx' => 'pdf',
          '.rtf' => 'pdf',
          '.pdf' => 'pdf'
        }

        has_one :attachment_preview, :dependent => :destroy

        after_save :generate_preview
      end


      def try_to_generate_preview
        format = preview_format
        if format && !attachment_preview
          create_attachment_preview(:file_type => format)
        elsif format && attachment_preview && !File.exist?(attachment_preview.diskfile)
          attachment_preview.send(:create_preview)
        else
          false
        end
      end

      def transformed_preview
        try_to_generate_preview
        attachment_preview
      end

      private

      def preview_format
        attachment_format = File.extname(filename).try(:downcase)
        PREVIEW_TRANSFORMATIONS[attachment_format]
      end

      def generate_preview
        try_to_generate_preview
        true
      end
    end
  end
end

unless Attachment.included_modules.include?(RedmineLightbox::Patches::AttachmentPatch)
  Attachment.send(:include, RedmineLightbox::Patches::AttachmentPatch)
end
